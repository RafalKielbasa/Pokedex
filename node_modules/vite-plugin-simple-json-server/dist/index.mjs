import path from 'node:path';
import fs from 'node:fs';
import AntPathMatcher from '@howiefh/ant-path-matcher';
import http from 'node:http';
import _get from 'lodash.get';
import fs$1 from 'node:fs/promises';
import querystring from 'node:querystring';
import util from 'node:util';

class Logger {
  constructor(packageName, logLevel = "info") {
    this.colors = {
      reset: "\x1B[0m",
      fg: {
        red: "\x1B[31m",
        green: "\x1B[32m",
        yellow: "\x1B[33m"
      }
    };
    this.packageName = packageName;
    this.logLevel = logLevel;
  }
  log(msg, prefix = "") {
    if (this.logLevel === "silent") {
      return;
    }
    const s = msg.join("\n");
    console.log(`%s${this.packageName}:%s ${s}
`, prefix, prefix ? this.colors.reset : "");
  }
  info(...msg) {
    if (this.logLevel === "error") {
      return;
    }
    this.log(msg);
  }
  success(...msg) {
    if (this.logLevel === "error") {
      return;
    }
    this.log(msg, this.colors.fg.green);
  }
  warn(...msg) {
    if (this.logLevel === "error") {
      return;
    }
    this.log(msg, this.colors.fg.yellow);
  }
  error(...msg) {
    this.log(msg, this.colors.fg.red);
  }
}

function isDirExists(s) {
  try {
    return fs.statSync(s).isDirectory();
  } catch (err) {
    if (err.code === "ENOENT") {
      return false;
    }
    throw err;
  }
}
function isFileExists(s) {
  try {
    return fs.statSync(s).isFile();
  } catch (err) {
    if (err.code === "ENOENT") {
      return false;
    }
    throw err;
  }
}

const PLUGIN_NAME = "vite-plugin-simple-json-server";

const SIMPLE_JSON_SERVER_CONFIG_DEFAULTS = {
  logLevel: "info",
  urlPrefixes: ["/api/"],
  mockDir: "mock",
  noHandlerResponse404: true,
  limit: 10,
  disable: false,
  delay: 0
};

function addSlashes(s) {
  if (!s.startsWith("/")) {
    s = `/${s}`;
  }
  if (!s.endsWith("/")) {
    s = `${s}/`;
  }
  return s;
}
function removeTrailingSlash(s) {
  return s.endsWith("/") ? s.substring(0, s.length - 1) : s;
}

const validateOptions = (options) => {
  const opts = {};
  opts.disable = options.disable ?? SIMPLE_JSON_SERVER_CONFIG_DEFAULTS.disable;
  opts.logLevel = options.logLevel || SIMPLE_JSON_SERVER_CONFIG_DEFAULTS.logLevel;
  const urlPrefixes = Array.isArray(options.urlPrefixes) ? options.urlPrefixes.filter(Boolean).map(addSlashes) : [];
  opts.urlPrefixes = urlPrefixes.length ? urlPrefixes : SIMPLE_JSON_SERVER_CONFIG_DEFAULTS.urlPrefixes;
  opts.mockDir = options.mockDir || SIMPLE_JSON_SERVER_CONFIG_DEFAULTS.mockDir;
  opts.staticDir = options.staticDir || opts.mockDir;
  opts.noHandlerResponse404 = options.noHandlerResponse404 ?? SIMPLE_JSON_SERVER_CONFIG_DEFAULTS.noHandlerResponse404;
  opts.limit = options.limit || SIMPLE_JSON_SERVER_CONFIG_DEFAULTS.limit;
  opts.handlers = options?.handlers?.filter(({ pattern, handle }) => pattern && handle);
  opts.delay = Math.max(0, options.delay ?? SIMPLE_JSON_SERVER_CONFIG_DEFAULTS.delay);
  return opts;
};

const timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const JSON_MIME_TYPE = "application/json";
const HTML_MIME_TYPE = "text/html";
const supportedMimes = {
  [HTML_MIME_TYPE]: ["html", "htm", "shtml"],
  [JSON_MIME_TYPE]: ["json"],
  "text/javascript": ["js", "mjs"],
  "text/css": ["css"],
  "text/plain": ["txt", "text", "conf", "def", "list", "log", "in", "ini"]
};
const mimes = Object.entries(supportedMimes).reduce(
  (all, [mime, exts]) => Object.assign(all, ...exts.map((ext) => ({ [ext]: mime }))),
  {}
);
const getMime = (ext) => mimes[ext];

function sendFileContent(res, filePath, mime, logger) {
  const msg = [filePath];
  const data = fs.readFileSync(filePath, "utf-8");
  return sendData(res, data, msg, logger, 200, mime);
}
function send400(res, msg, logger) {
  return sendError(res, msg, logger, 400);
}
function send403(res, msg, logger) {
  return sendError(res, msg, logger, 403);
}
function send404(res, msg, logger) {
  return sendError(res, msg, logger, 404);
}
function send405(res, msg, logger) {
  return sendError(res, msg, logger, 405);
}
function send409(res, msg, logger) {
  return sendError(res, msg, logger, 409);
}
function send415(res, msg, logger) {
  return sendError(res, msg, logger, 415);
}
function sendError(res, msg, logger, statusCode) {
  let customMsg = Array.isArray(msg) ? msg[0] : msg;
  if (customMsg) {
    customMsg = `, ${customMsg}`;
  }
  return sendData(
    res,
    { message: `${http.STATUS_CODES[statusCode]}${customMsg}` },
    [`${statusCode} ${http.STATUS_CODES[statusCode]}`, ...Array.isArray(msg) ? msg : [msg]],
    logger,
    statusCode
  );
}
function sendData(res, data, msg, logger, statusCode = 200, mime = JSON_MIME_TYPE) {
  logger.info(`${res.req.method} ${res.req.url}`, ...msg.filter(Boolean));
  res.statusCode = statusCode;
  if (statusCode === 204) {
    res.setHeader("Content-Length", "0");
    res.end();
  } else {
    if (!mime) {
      throw new Error("Please, provide 'mime'");
    }
    res.setHeader("content-type", mime);
    res.end(typeof data === "string" ? data : JSON.stringify(data));
  }
  return true;
}
function sendOptions(res, options, msg, logger) {
  return sendHeader(res, { Allow: options.join(",") }, msg, logger);
}
function sendHeader(res, header, msg, logger, statusCode = 204) {
  logger.info(`${res.req.method} ${res.req.url}`, ...msg.filter(Boolean));
  Object.entries(header).forEach(([key, value]) => {
    res.setHeader(key, value);
  });
  res.statusCode = statusCode;
  res.end();
  return true;
}

const isOurApi = (url, urlPrefixes) => url && urlPrefixes && urlPrefixes.some((prefix) => url.startsWith(prefix));

const OPEN_API = "v3/openapi";

const getFilePath = (pathname, mime) => {
  if (isFileExists(pathname)) {
    const { ext } = path.parse(pathname);
    return getMime(ext.substring(1)) === mime ? pathname : false;
  }
  let name;
  if (isDirExists(pathname)) {
    name = path.join(pathname, "index");
  } else {
    name = pathname;
  }
  name += ".";
  for (const ext of supportedMimes[mime]) {
    if (isFileExists(name + ext)) {
      return name + ext;
    }
  }
  return "";
};

const parsePathname = (dataRoot, purePath) => {
  let pathname = path.join(dataRoot, purePath);
  let filePath = getFilePath(pathname, JSON_MIME_TYPE);
  if (filePath === false) {
    return false;
  }
  let idParam = "";
  let resourceName = purePath;
  if (filePath === "") {
    const index = purePath.lastIndexOf("/");
    if (index === -1) {
      return false;
    }
    resourceName = purePath.substring(0, index);
    pathname = path.join(dataRoot, resourceName);
    filePath = getFilePath(pathname, JSON_MIME_TYPE);
    if (!filePath) {
      return false;
    }
    idParam = purePath.substring(index + 1);
  }
  return { resourceName, idParam, filePath };
};

function compPropertiesOfDeep(sortBy) {
  function compareByProperty(arg) {
    let key;
    let sortOrder = 1;
    if (typeof arg === "string" && arg.startsWith("-")) {
      sortOrder = -1;
      key = arg.substring(1);
    } else {
      key = arg;
    }
    return function(a, b) {
      const val_a = _get(a, key);
      if (val_a === void 0 || val_a === null) {
        return 0;
      }
      const val_b = _get(b, key);
      if (val_b === void 0 || val_b === null) {
        return 0;
      }
      const result = val_a < val_b ? -1 : val_a > val_b ? 1 : 0;
      return result * sortOrder;
    };
  }
  return function(obj1, obj2) {
    let i = 0;
    let result = 0;
    const numberOfProperties = sortBy?.length;
    while (result === 0 && i < numberOfProperties) {
      result = compareByProperty(sortBy[i])(obj1, obj2);
      i++;
    }
    return result;
  };
}
function sortDeep(arr, ...sortBy) {
  return arr.sort(compPropertiesOfDeep(sortBy));
}

const searchPropDeep = (item, q, params) => {
  for (const param of params) {
    const [prop, op] = parseParam(param);
    const propValue = _get(item, prop);
    if (propValue === void 0 || propValue === null) {
      return false;
    }
    if (Array.isArray(q[param])) {
      if (!q[param].some((paramValue) => comp(propValue, paramValue, op))) {
        return false;
      }
    } else if (!comp(propValue, q[param], op)) {
      return false;
    }
  }
  return true;
};
const ops = ["ne", "lt", "gt", "lte", "gte", "like"];
function parseParam(p) {
  const i = p.indexOf("[");
  if (i === -1) {
    return [p];
  }
  const name = p.substring(0, i);
  const j = p.indexOf("]", i);
  if (j === -1) {
    return [name];
  }
  const op = p.substring(i + 1, j);
  if (!op) {
    return [name];
  }
  if (!ops.some((val) => val === op)) {
    return [p];
  }
  return [name, op];
}
function comp(a, b, op) {
  switch (op) {
    case "ne":
      return a != b;
    case "lt":
      return a < b;
    case "lte":
      return a <= b;
    case "gt":
      return a > b;
    case "gte":
      return a >= b;
    case "like":
      return new RegExp(b, "i").test(a.toString());
    default:
      return a == b;
  }
}

class JsonDb {
  constructor(pathname) {
    this.rawContent = "";
    this.pathname = pathname;
  }
  async load() {
    this.rawContent = await fs$1.readFile(this.pathname, { encoding: "utf-8" });
    this.data = JSON.parse(this.rawContent);
  }
  isTable() {
    return Array.isArray(this.data);
  }
  async write() {
    await fs$1.writeFile(this.pathname, JSON.stringify(this.data), { encoding: "utf-8" });
  }
  async updateObject(data, replace = true) {
    if (replace) {
      this.data = data;
    } else {
      this.data = {
        ...this.data,
        ...data
      };
    }
    await this.write();
    return { ...this.data };
  }
}

class JsonTable extends JsonDb {
  getIndexById(id) {
    return this.data.findIndex((item) => item.id == id);
  }
  exists(id) {
    return this.getIndexById(id) !== -1;
  }
  count(q) {
    if (this.data.length === 0 || !q) {
      return this.data.length;
    }
    const props = Object.keys(q);
    if (props.length === 0) {
      return this.data.length;
    }
    return this.data.reduce((prev, curr) => searchPropDeep(curr, q, props) ? prev + 1 : prev, 0);
  }
  filter(q) {
    if (!q || this.data.length === 0) {
      return;
    }
    const props = Object.keys(q);
    if (!props.length) {
      return;
    }
    this.data = this.data.filter((item) => searchPropDeep(item, q, props));
  }
  sort(params) {
    if (params.length === 0) {
      return;
    }
    sortDeep(this.data, ...params);
  }
  getFirst() {
    if (this.isTable()) {
      return this.data.length ? this.data[0] : {};
    } else {
      return this.data;
    }
  }
  getById(id) {
    return this.data.find((item) => item.id == id);
  }
  slice(begin, end) {
    this.data = this.data.slice(begin, end);
  }
  serialize(spaces = 0) {
    return JSON.stringify(this.data, null, spaces);
  }
  async delete(id) {
    const index = this.getIndexById(id);
    if (index === -1) {
      return false;
    }
    this.data.splice(index, 1);
    await this.write();
    return true;
  }
  async update(id, item, replace = true) {
    const index = this.getIndexById(id);
    if (index === -1) {
      return false;
    }
    item.id = id;
    if (replace) {
      this.data.splice(index, 1, item);
    } else {
      this.data[index] = {
        ...this.data[index],
        ...item
      };
    }
    await this.write();
    return true;
  }
  async push(item) {
    if (item.hasOwnProperty("id")) {
      if (this.exists(item.id)) {
        return false;
      }
    } else {
      item.id = this.getNextId();
    }
    this.data.push(item);
    await this.write();
    return true;
  }
  getNextId() {
    return this.data.reduce((prev, curr) => {
      const n = curr.id !== void 0 ? parseInt(curr.id) : 0;
      return Math.max(prev, n);
    }, 0) + 1;
  }
}

class BodyParseError extends Error {
  constructor(message) {
    super(message);
    this.name = "BodyParseError";
  }
}
const PAYLOAD_LIMIT = 1e6;
const parseBody = async (req) => {
  const buffers = [];
  let n = 0;
  for await (const chunk of req) {
    if (chunk?.length) {
      n += chunk.length;
    }
    if (n > PAYLOAD_LIMIT) {
      throw new BodyParseError("Request body exceeds 1e6");
    }
    buffers.push(chunk);
  }
  const body = Buffer.concat(buffers).toString();
  if (!body) {
    throw new BodyParseError("Empty body");
  }
  try {
    return JSON.parse(body);
  } catch (err) {
    throw new BodyParseError("Not valid json in body");
  }
};

const isJson = (req) => {
  if (!req.headers) {
    return false;
  }
  const keys = Object.keys(req.headers);
  const key = keys.find((key2) => key2.toLocaleLowerCase() === "content-type");
  if (!key) {
    return false;
  }
  return req.headers[key].includes("application/json");
};

function modifyHeader(res, key, value) {
  if (value === "" || value === void 0) {
    return;
  }
  if (!res.hasHeader(key)) {
    res.setHeader(key, value);
    return;
  }
  const prev = res.getHeader(key);
  if (Array.isArray(prev)) {
    res.setHeader(key, [...prev, value]);
    return;
  }
  res.setHeader(key, prev ? `${prev},${value}` : value);
}

function getFullUrl(req, urlPath) {
  const protocol = req.socket?.encrypted ? "s" : "";
  return `http${protocol}://${req.headers.host}${urlPath}`;
}

const onPost = async (res, filePath, logger) => {
  if (!isJson(res.req)) {
    return send415(res, "", logger);
  }
  let item;
  try {
    item = await parseBody(res.req);
  } catch (err) {
    if (err instanceof BodyParseError) {
      return send400(res, err.message, logger);
    }
    throw err;
  }
  const table = new JsonTable(filePath);
  await table.load();
  let location = getFullUrl(res.req, res.req.url);
  if (table.isTable()) {
    const success = await table.push(item);
    if (!success) {
      return send409(res, [`resource with id=${item.id} already exists`, filePath], logger);
    }
    location += `/${item.id}`;
  } else {
    await table.updateObject(item, true);
  }
  res.setHeader("Location", location);
  modifyHeader(res, "Access-Control-Expose-Headers", "Location");
  return sendData(res, item, [`resource with id=${item.id} created`, filePath], logger, 201);
};

const getParams = (q, defaultLimit) => {
  const { offset: srcOffset, limit: srcLimit, sort: srcSort, ...srcFilterParams } = q;
  const filterParams = getFilterParams(srcFilterParams);
  let offset = void 0;
  let limit = void 0;
  const sortParams = [];
  if (srcOffset) {
    offset = Math.max(0, parseInt(Array.isArray(srcOffset) ? srcOffset[0] : srcOffset));
  }
  if (srcLimit) {
    limit = Math.max(0, parseInt(Array.isArray(srcLimit) ? srcLimit[0] : srcLimit));
  }
  if (offset !== void 0 || limit !== void 0) {
    if (offset === void 0) {
      offset = 0;
    }
    if (limit === void 0 || limit === 0) {
      limit = defaultLimit;
    }
  }
  if (srcSort) {
    const parseSortParam = (value) => value.split(",").map((item) => item.trim()).filter(Boolean);
    if (Array.isArray(srcSort)) {
      sortParams.push(...srcSort.map(parseSortParam).flat());
    } else {
      sortParams.push(...parseSortParam(srcSort));
    }
  }
  return { offset, limit, sortParams, filterParams };
};
function getFilterParams(src) {
  let result = void 0;
  Object.entries(src).forEach(([key, value]) => {
    if (value !== void 0) {
      if (!result) {
        result = {};
      }
      result[key] = value;
    }
  });
  return result;
}

async function onHeadAll(req, res, logger, filePath, defaultLimit) {
  const [, qs] = req.url.split("?");
  const table = new JsonTable(filePath);
  await table.load();
  if (!table.isTable()) {
    return send405(res, ["", filePath], logger);
  }
  const q = querystring.parse(qs);
  const { filterParams } = getParams(q, defaultLimit);
  const count = table.count(filterParams);
  return sendHeader(
    res,
    {
      "X-Total-Count": count,
      "Access-Control-Expose-Headers": "X-Total-Count"
    },
    [filePath],
    logger
  );
}

function getLinks(template, offset, limit, totalCount) {
  if (limit >= totalCount) {
    return "";
  }
  const linkItems = [];
  if (offset !== 0) {
    linkItems.push(util.format(template, Math.max(0, offset - limit), "prev"));
  }
  if (offset < totalCount - limit) {
    linkItems.push(util.format(template, offset + limit, "next"));
  }
  linkItems.push(util.format(template, 0, "first"));
  linkItems.push(util.format(template, offset + (Math.ceil((totalCount - offset) / limit) - 1) * limit, "last"));
  return linkItems.join(",");
}

async function onGetAll(req, res, logger, filePath, urlPath, defaultLimit) {
  const [, qs] = req.url.split("?");
  if (!qs) {
    return sendFileContent(res, filePath, JSON_MIME_TYPE, logger);
  }
  const msgMatched = [filePath];
  const table = new JsonTable(filePath);
  await table.load();
  if (!table.isTable()) {
    return sendData(res, table.rawContent, msgMatched, logger);
  }
  const q = querystring.parse(qs);
  const { offset, limit, sortParams, filterParams } = getParams(q, defaultLimit);
  if (filterParams) {
    table.filter(filterParams);
    if (table.count() === 0) {
      return send404(res, [`q=${querystring.stringify(q)}`, filePath], logger);
    }
  }
  if (sortParams) {
    table.sort(sortParams);
  }
  if (offset !== void 0 && limit !== void 0) {
    const totalCount = table.count();
    table.slice(offset, offset + limit);
    delete q.offset;
    const qs2 = querystring.stringify(q);
    const template = `<${getFullUrl(req, urlPath)}?${qs2}&offset=%d>;rel="%s"`;
    const links = getLinks(template, offset, limit, totalCount);
    res.setHeader("X-Total-Count", totalCount);
    modifyHeader(res, "Link", links);
    modifyHeader(res, "Access-Control-Expose-Headers", "X-Total-Count,Link");
  }
  return sendData(res, table.serialize(), msgMatched, logger);
}

const onPutPatchAll = async (res, filePath, logger, method) => {
  if (!isJson(res.req)) {
    return send415(res, "", logger);
  }
  let item;
  try {
    item = await parseBody(res.req);
  } catch (err) {
    if (err instanceof BodyParseError) {
      return send400(res, err.message, logger);
    }
    throw err;
  }
  const table = new JsonTable(filePath);
  await table.load();
  if (table.isTable()) {
    return send405(res, ["", filePath], logger);
  }
  const updated = await table.updateObject(item, method === "PUT");
  return sendData(res, updated, [`resource ${method === "PUT" ? "replaced" : "patched"}`, filePath], logger, 200);
};

const onDelete = async (res, filePath, logger, id) => {
  const table = new JsonTable(filePath);
  await table.load();
  if (!table.isTable()) {
    return send404(res, ["Not array", filePath], logger);
  }
  if (!await table.delete(id)) {
    return send404(res, [`id=${id}`, filePath], logger);
  }
  return sendData(res, void 0, [`resource with id=${id} deleted`, filePath], logger, 204);
};

const onPutPatch = async (res, filePath, logger, id, method) => {
  const table = new JsonTable(filePath);
  await table.load();
  if (!table.isTable()) {
    return send404(res, ["Not array", filePath], logger);
  }
  if (!isJson(res.req)) {
    return send415(res, "", logger);
  }
  let item;
  try {
    item = await parseBody(res.req);
  } catch (err) {
    if (err instanceof BodyParseError) {
      return send400(res, err.message, logger);
    }
    throw err;
  }
  if (!await table.update(id, item, method === "PUT")) {
    return send404(res, [`id=${id}`, filePath], logger);
  }
  return sendData(res, item, [`resource with id=${item.id} ${method === "PUT" ? "replaced" : "patched"}`, filePath], logger);
};

const onGet = async (res, filePath, logger, id) => {
  const table = new JsonTable(filePath);
  await table.load();
  if (!table.isTable()) {
    return send404(res, ["Not array", filePath], logger);
  }
  const item = table.getById(id);
  if (!item) {
    return send404(res, [`id=${id}`, filePath], logger);
  }
  return sendData(res, item, [`id=${id} found`, filePath], logger);
};

async function handleJson(req, res, mockRoot, purePath, logger, urlPath, defaultLimit) {
  const parsed = parsePathname(mockRoot, purePath);
  if (!parsed) {
    return false;
  }
  const { idParam, filePath } = parsed;
  if (idParam) {
    const id = parseInt(idParam);
    switch (req.method) {
      case "OPTIONS": {
        const db = new JsonDb(filePath);
        await db.load();
        const methods = ["GET", "PUT", "PATCH"];
        if (db.isTable()) {
          methods.push("DELETE");
        }
        return sendOptions(res, methods, [filePath], logger);
      }
      case "GET":
        return await onGet(res, filePath, logger, id);
      case "PUT":
      case "PATCH":
        return await onPutPatch(res, filePath, logger, id, req.method);
      case "DELETE":
        return await onDelete(res, filePath, logger, id);
      case "POST": {
        const db = new JsonDb(filePath);
        await db.load();
        if (!db.isTable()) {
          return send404(res, ["", filePath], logger);
        }
      }
      default:
        return send405(res, ["", filePath], logger);
    }
  }
  switch (req.method) {
    case "OPTIONS":
      const db = new JsonDb(filePath);
      await db.load();
      const methods = ["GET", "POST"];
      if (!db.isTable()) {
        methods.push("PUT", "PATCH");
      }
      return sendOptions(res, methods, [filePath], logger);
    case "HEAD":
      return await onHeadAll(req, res, logger, filePath, defaultLimit);
    case "GET":
      return await onGetAll(req, res, logger, filePath, urlPath, defaultLimit);
    case "PUT":
    case "PATCH":
      return await onPutPatchAll(res, filePath, logger, req.method);
    case "POST":
      return await onPost(res, filePath, logger);
    default:
      return send405(res, ["", filePath], logger);
  }
}

function handleOther(req, res, staticRoot, purePath, logger) {
  const pathname = path.join(staticRoot, purePath);
  if (!isFileExists(pathname)) {
    return false;
  }
  const ext = path.parse(pathname).ext.substring(1);
  const mime = getMime(ext);
  if (!mime) {
    return false;
  }
  switch (req.method) {
    case "OPTIONS":
      return sendOptions(res, ["GET"], [pathname], logger);
    case "GET":
      return sendFileContent(res, pathname, mime, logger);
    default:
      return send403(res, [`Received: ${req.method}`, pathname], logger);
  }
}

const name = "vite-plugin-simple-json-server";
const version = "0.6.2";
const description = "Provide a file-based mock API for Vite in dev mode";
const keywords = [
	"vite",
	"plugin",
	"vite-plugin",
	"json",
	"api",
	"server"
];
const author = {
	name: "Oleksii Tymoshenko"
};
const license = "MIT";
const repository = {
	type: "git",
	url: "https://github.com/alextim/vite-plugin-simple-json-server.git",
	directory: "packages/vite-plugin-simple-json-server"
};
const homepage = "https://github.com/alextim/vite-plugin-simple-json-server/tree/main/packages/vite-plugin-simple-json-server#readme";
const bugs = "https://github.com/alextim/vite-plugin-simple-json-server/issues";
const main = "dist/index.cjs";
const module = "dist/index.mjs";
const types = "dist/index.d.ts";
const files = [
	"dist/index.cjs",
	"dist/index.mjs",
	"dist/index.d.ts"
];
const scripts = {
	build: "rimraf dist && unbuild",
	typecheck: "tsc --noEmit --pretty",
	test: "vitest run",
	"test:v": "vitest --run --reporter verbose",
	coverage: "vitest run --coverage",
	"test:pub": "pnpm publish --dry-run --no-git-checks"
};
const dependencies = {
	"@howiefh/ant-path-matcher": "^0.0.4",
	"lodash.get": "^4.4.2"
};
const devDependencies = {
	"@types/lodash.get": "^4.4.7",
	"@types/mock-fs": "^4.13.1",
	"@types/node": "^18.7.23",
	"mock-fs": "^5.1.4",
	typescript: "^4.8.4",
	unbuild: "^0.8.11",
	vite: "^4.0.3",
	vitest: "^0.23.4"
};
const publishConfig = {
	access: "public",
	registry: "https://registry.npmjs.org"
};
const peerDependencies = {
	vite: "^4.0.0"
};
const engines = {
	node: ">=15.7.0"
};
const pkg = {
	name: name,
	version: version,
	description: description,
	keywords: keywords,
	author: author,
	license: license,
	repository: repository,
	homepage: homepage,
	bugs: bugs,
	main: main,
	module: module,
	types: types,
	files: files,
	scripts: scripts,
	dependencies: dependencies,
	devDependencies: devDependencies,
	publishConfig: publishConfig,
	peerDependencies: peerDependencies,
	engines: engines
};

function handleOpenApiIndex(req, res, urlPath, logger) {
  switch (req.method) {
    case "OPTIONS":
      return sendOptions(res, ["GET"], ["OpenApi"], logger);
    case "GET":
      const data = indexHtml(pkg.name, urlPath);
      return sendData(res, data, [], logger, 200, HTML_MIME_TYPE);
    default:
      return send403(res, [`Received: ${req.method}`], logger);
  }
}
const swaggerVer = "4.14.0";
function indexHtml(title, url) {
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="SwaggerUI" />
    <title>${title}</title>
    <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@${swaggerVer}/swagger-ui.css" />
  </head>
  <body>
  <div id="swagger-ui"></div>
  <script src="https://unpkg.com/swagger-ui-dist@${swaggerVer}/swagger-ui-bundle.js" crossorigin><\/script>
  <script>
    window.onload = () => {
      window.ui = SwaggerUIBundle({
        url: '${removeTrailingSlash(url)}.json',
        dom_id: '#swagger-ui',
      });
    };
  <\/script>
  </body>
</html>
`;
}

const scanDir = async (dir) => {
  const result = [];
  const items = await fs$1.readdir(dir);
  for (const item of items) {
    const pathname = path.join(dir, item);
    const stat = await fs$1.stat(pathname);
    if (stat.isDirectory()) {
      result.push(...await scanDir(pathname));
    }
    result.push(pathname);
  }
  return result;
};

const contentApiError = {
  "application/json": {
    schema: {
      $ref: "#/components/schemas/ApiErrorResponse"
    }
  }
};
const code400 = {
  description: "Bad Request: in case of empty body, not valid JSON or too big body (>1e6)",
  content: contentApiError
};
const code404 = {
  description: "Resource with `id` not found",
  content: contentApiError
};
const code409 = {
  description: "Resource with `id` already exists",
  content: contentApiError
};
const code415 = {
  description: "Unsupported Media Type",
  content: contentApiError
};
const options = {
  responses: {
    204: {
      description: "Success",
      headers: {
        allow: {
          description: "Commas-separated allowed methods list",
          schema: {
            type: "string"
          }
        }
      }
    }
  }
};
const operationsStatic = {
  get: {
    responses: {
      200: {
        description: "Success",
        content: {}
      }
    }
  }
};
const operationsAllTable = {
  head: {
    responses: {
      204: {
        description: "Success",
        headers: {
          "X-Total-Count": {
            description: "The number of items matching filter criteria",
            schema: {
              type: "integer"
            }
          }
        }
      }
    }
  },
  get: {
    parameters: [
      {
        name: "sort",
        in: "query",
        description: "List of fields separated by commas. Use `-` before the field name for descending sort order",
        required: false,
        explode: false,
        schema: {
          type: "array",
          items: {
            type: "string"
          }
        },
        style: "form"
      },
      {
        name: "offset",
        in: "query",
        description: "The number of items to skip.",
        required: false,
        explode: false,
        schema: {
          type: "integer",
          format: "int64",
          minimum: 0
        },
        style: "form"
      },
      {
        name: "limit",
        in: "query",
        description: "The maximum number of items to return in the response.",
        required: false,
        explode: false,
        schema: {
          type: "integer",
          format: "int64",
          minimum: 0
        },
        style: "form"
      }
    ],
    responses: {
      200: {
        description: "Success",
        content: {
          "application/json": {
            schema: {
              type: "array",
              items: {
                $ref: "#/components/schemas/{placeholder}"
              }
            }
          }
        }
      }
    }
  },
  post: {
    requestBody: {
      required: true,
      description: "create new object",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/{placeholder}"
          }
        }
      }
    },
    responses: {
      201: {
        description: "Success",
        headers: {
          Link: {
            description: "Link to created resource",
            schema: {
              type: "string"
            }
          }
        },
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/{placeholder}"
            }
          }
        }
      },
      400: code400,
      409: code409,
      415: code415
    }
  },
  options
};
const operationsAllObject = {
  get: {
    responses: {
      200: {
        description: "Success",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/{placeholder}"
            }
          }
        }
      }
    }
  },
  post: {
    requestBody: {
      required: true,
      description: "create new object",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/{placeholder}"
          }
        }
      }
    },
    responses: {
      201: {
        description: "Success",
        headers: {
          Link: {
            description: "Link to created resource",
            schema: {
              type: "string"
            }
          }
        },
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/{placeholder}"
            }
          }
        }
      },
      400: code400,
      415: code415
    }
  },
  options,
  put: {
    requestBody: {
      required: true,
      description: "replace object",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/{placeholder}"
          }
        }
      }
    },
    responses: {
      200: {
        description: "Success",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/{placeholder}"
            }
          }
        }
      },
      400: code400
    }
  },
  patch: {
    requestBody: {
      required: true,
      description: "modify object",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/{placeholder}"
          }
        }
      }
    },
    responses: {
      200: {
        description: "Success",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/{placeholder}"
            }
          }
        }
      },
      400: code400
    }
  }
};
const idParameter = {
  name: "id",
  in: "path",
  description: "ID of resource to return",
  required: true,
  schema: {
    type: "integer",
    format: "int64",
    minimum: 0
  }
};
const operationsGetById = {
  get: {
    parameters: [idParameter],
    responses: {
      200: {
        description: "Success",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/{placeholder}"
            }
          }
        }
      },
      404: code404
    }
  },
  options,
  put: {
    parameters: [{ ...idParameter, description: "ID of resource to replace" }],
    requestBody: {
      required: true,
      description: "replace object",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/{placeholder}"
          }
        }
      }
    },
    responses: {
      200: {
        description: "Success",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/{placeholder}"
            }
          }
        }
      },
      400: code400,
      404: code404,
      415: code415
    }
  },
  patch: {
    parameters: [{ ...idParameter, description: "ID of resource to modify" }],
    requestBody: {
      required: true,
      description: "modify object",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/{placeholder}"
          }
        }
      }
    },
    responses: {
      200: {
        description: "Success",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/{placeholder}"
            }
          }
        }
      },
      400: code400,
      404: code404,
      415: code415
    }
  },
  delete: {
    parameters: [{ ...idParameter, description: "ID of resource to delete" }],
    responses: {
      200: {
        description: "Success, returns empty object",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/EmptyObject"
            }
          }
        }
      },
      404: code404
    }
  }
};

const isPlainObject = (obj) => obj ? typeof obj === "object" && Object.getPrototypeOf(obj) === Object.prototype : false;
const supportType = ["string", "number", "array", "object", "boolean", "integer"];
const isSchema = (object) => supportType.indexOf(object.type) !== -1;
function getType(type) {
  if (type === 0) {
    return "number";
  }
  if (!type) {
    return "string";
  }
  return supportType.indexOf(type) !== -1 ? type : typeof type;
}
function handleSchema(json, schema) {
  Object.assign(schema, json);
  if (schema.type === "object") {
    delete schema.properties;
    parse(json.properties, schema);
  }
  if (schema.type === "array") {
    delete schema.items;
    schema.items = {};
    parse(json.items, schema.items);
  }
}
function handleArray(arr, schema) {
  schema.type = "array";
  const props = schema.items = {};
  parse(arr[0], props);
}
function handleObject(json, schema) {
  if (isSchema(json)) {
    return handleSchema(json, schema);
  }
  schema.type = "object";
  schema.properties = {};
  const props = schema.properties;
  for (const key in json) {
    props[key] = {};
    parse(json[key], props[key]);
  }
}
function parse(json, schema) {
  if (Array.isArray(json)) {
    handleArray(json, schema);
    return;
  }
  if (isPlainObject(json)) {
    handleObject(json, schema);
    return;
  }
  schema.type = getType(json);
}
function getJsonSchema(data) {
  const jsonSchema = {};
  parse(data, jsonSchema);
  return jsonSchema;
}

const openApiVer = "3.0";
const regex = /[^{}]+(?=\})/g;
const SEP = " #";
const clone = (o) => JSON.parse(JSON.stringify(o));
const toSchemaName = (name) => name.replace(SEP, "-");
const getPathItem = (o, name) => {
  const opts = clone(o);
  for (const method of Object.keys(opts)) {
    const schemaRef = `#/components/schemas/${toSchemaName(name)}`;
    opts[method].tags = [name];
    if (method === "get") {
      const schema = opts[method].responses[200].content["application/json"].schema;
      if (schema.items) {
        schema.items.$ref = schemaRef;
      } else {
        schema.$ref = schemaRef;
      }
    } else if (method === "put" || method === "patch" || method === "post") {
      opts[method].requestBody.content["application/json"].schema.$ref = schemaRef;
      opts[method].responses[method === "post" ? 201 : 200].content["application/json"].schema.$ref = schemaRef;
    }
  }
  return opts;
};
const getPatternFromPath = (mockRoot, file, isIndex = false, ext = "") => {
  let pattern = file.substring(mockRoot.length, file.length - ext.length).replaceAll("\\", "/");
  if (isIndex) {
    pattern = pattern.split("/").slice(0, -1).join("/");
  }
  return pattern || "/";
};
const getName = (name, tags) => {
  const tag = tags.find((el) => el.name === name);
  if (!tag) {
    return name;
  }
  const template = `${name}${SEP}`;
  const nextId = tags.reduce((prev, curr) => {
    if (curr.name.startsWith(template)) {
      return Math.max(parseInt(curr.name.substring(template.length)) + 1, prev);
    }
    return prev;
  }, 0);
  return `${name}${SEP}${nextId}`;
};
const swaggerMethods = ["get", "put", "patch", "post", "delete", "options", "trace", "head"];
const idDefaultSchema = {
  type: "integer",
  format: "int64"
};
async function getJson(mockRoot, staticRoot, options) {
  const tags = [];
  const paths = {};
  const schemas = {};
  const { urlPrefixes, handlers } = options;
  handlers?.forEach(({ pattern: srcPattern, method }, i) => {
    for (const prefix of urlPrefixes) {
      if (srcPattern.startsWith(prefix)) {
        const pattern = srcPattern.substring(prefix.length - 1);
        const parameters = pattern.match(regex)?.map((name2) => ({ name: name2, in: "path" }));
        const name = `handler${SEP}${i}`;
        tags.push({ name });
        const methods = method ? [method] : swaggerMethods;
        paths[pattern] = {};
        methods.forEach((m) => {
          paths[pattern][m.toLowerCase()] = {
            tags: [name],
            parameters
          };
        });
        break;
      }
    }
  });
  const jsonFiles = (await scanDir(mockRoot)).filter(
    (file) => supportedMimes[JSON_MIME_TYPE].some((mime) => mime === path.extname(file).substring(1))
  );
  for (const file of jsonFiles) {
    const { name: basename, ext } = path.parse(file);
    const pattern = getPatternFromPath(mockRoot, file, basename === "index", ext);
    const name = getName(basename, tags);
    tags.push({ name, description: file });
    const tbl = new JsonTable(file);
    await tbl.load();
    const sample = tbl.getFirst();
    const schema = getJsonSchema(sample);
    schemas[toSchemaName(name)] = schema;
    if (tbl.isTable()) {
      if (!schema.properties.id || schema.properties.id.type === "number") {
        schema.properties.id = idDefaultSchema;
        schema.required = ["id"];
      }
      paths[pattern] = getPathItem(operationsAllTable, name);
      paths[`${pattern}/{id}`] = getPathItem(operationsGetById, name);
    } else {
      paths[pattern] = getPathItem(operationsAllObject, name);
    }
  }
  const staticFiles = await scanDir(staticRoot);
  for (const file of staticFiles) {
    const ext = path.extname(file).substring(1);
    const mime = getMime(ext);
    if (mime) {
      const basename = path.basename(file);
      const pattern = getPatternFromPath(staticRoot, file);
      const name = getName(basename, tags);
      tags.push({ name, description: file });
      const operations = clone(operationsStatic);
      operations.get.tags = [name];
      operations.get.responses[200].content = {
        [mime]: {
          schema: {
            type: "string"
          }
        }
      };
      paths[pattern] = operations;
    }
  }
  return {
    openapi: `${openApiVer}.3`,
    info: {
      title: `${pkg.name} - OpenAPI ${openApiVer}`,
      description: `This is a api description exposed by ${pkg.name} based on the OpenAPI ${openApiVer} specification.`,
      license: {
        name: "MIT",
        url: "https://opensource.org/licenses/MIT"
      },
      version: pkg.version
    },
    externalDocs: {
      description: `Find out more about ${pkg.name}`,
      url: pkg.homepage
    },
    servers: urlPrefixes.map((url) => ({ url })),
    tags,
    paths,
    components: {
      schemas: {
        ...schemas,
        EmptyObject: {
          type: "object",
          properties: {}
        },
        ApiErrorResponse: {
          type: "object",
          properties: {
            message: {
              type: "string"
            }
          }
        }
      }
    }
  };
}

async function handleOpenApiJson(req, res, mockRoot, staticRoot, options, logger) {
  switch (req.method) {
    case "OPTIONS":
      return sendOptions(res, ["GET"], ["OpenApi"], logger);
    case "GET":
      const data = await getJson(mockRoot, staticRoot, options);
      return sendData(res, data, [], logger);
    default:
      return send403(res, [`Received: ${req.method}`], logger);
  }
}

const removePrefix = (url, urlPrefixes) => {
  for (const prefix of urlPrefixes) {
    if (url.startsWith(prefix)) {
      return url.substring(prefix.length);
    }
  }
  return "";
};
const matcher = new AntPathMatcher();
const runMiddleware = async (req, res, mockRoot, staticRoot, options, logger) => {
  const { urlPrefixes, handlers, limit, noHandlerResponse404, delay } = options;
  if (!isOurApi(req?.url, urlPrefixes)) {
    return false;
  }
  const urlPath = removeTrailingSlash(req.url.split("?")[0]);
  const purePath = removePrefix(urlPath, urlPrefixes) || "/";
  if (matcher.doMatch(`${urlPrefixes[0]}${OPEN_API}.json`, urlPath, true)) {
    return await handleOpenApiJson(req, res, mockRoot, staticRoot, options, logger);
  }
  if (matcher.doMatch(`${urlPrefixes[0]}${OPEN_API}`, urlPath, true)) {
    return handleOpenApiIndex(req, res, urlPath, logger);
  }
  if (delay) {
    let cancelRequest = false;
    req.on("close", () => {
      cancelRequest = true;
    });
    await timeout(delay);
    if (cancelRequest) {
      logger.info(`${res.req.method} ${res.req.url}`, "cancelled by user");
      return false;
    }
  }
  if (handlers) {
    for (const handler of handlers) {
      const urlVars = {};
      if (matcher.doMatch(handler.pattern, urlPath, true, urlVars)) {
        const handlerInfo = [`handler = ${JSON.stringify(handler, null, 2)}`];
        if (Object.keys(urlVars).length) {
          handlerInfo.push(`urlVars = ${JSON.stringify(urlVars, null, 2)}`);
        }
        if (handler.method && handler.method !== req.method) {
          return send405(res, handlerInfo, logger);
        }
        logger.info("matched", ...handlerInfo);
        handler.handle(req, res, { ...urlVars });
        return true;
      }
    }
  }
  if (purePath) {
    if (await handleJson(req, res, mockRoot, purePath, logger, urlPath, limit)) {
      return true;
    }
    if (handleOther(req, res, staticRoot, purePath, logger)) {
      return true;
    }
  }
  if (noHandlerResponse404) {
    return send404(res, "No any handler or file route", logger);
  }
  return false;
};

let logger;
const simpleJsonServerPlugin = (opts = {}) => {
  let config;
  let mockRoot;
  let staticRoot;
  let options;
  return {
    name: PLUGIN_NAME,
    apply: "serve",
    configResolved(resolvedConfig) {
      config = resolvedConfig;
      options = validateOptions(opts);
      logger = new Logger(PLUGIN_NAME, options.logLevel);
      if (options.disable) {
        logger.info("disabled");
        return;
      }
      mockRoot = path.join(config.root, options.mockDir);
      if (!isDirExists(mockRoot)) {
        logger.warn("Mock directory doesn't exist", mockRoot);
      }
      staticRoot = path.join(config.root, options.staticDir);
      if (!isDirExists(staticRoot) && options.mockDir !== options.staticDir) {
        logger.warn("Static directory doesn't exist", staticRoot);
      }
    },
    configureServer(server) {
      if (options.disable) {
        return;
      }
      logger.info("server started.", `options = ${JSON.stringify(options, null, "  ")}`);
      server.middlewares.use(async (req, res, next) => {
        try {
          if (!await runMiddleware(req, res, mockRoot, staticRoot, options, logger)) {
            next();
          }
        } catch (err) {
          server.ssrFixStacktrace(err);
          process.exitCode = 1;
          next(err);
        }
      });
    },
    configurePreviewServer(server) {
      if (options.disable) {
        return;
      }
      logger.info("server started.", `options = ${JSON.stringify(options, null, "  ")}`);
      server.middlewares.use(async (req, res, next) => {
        try {
          if (!await runMiddleware(req, res, mockRoot, staticRoot, options, logger)) {
            next();
          }
        } catch (err) {
          logger.error(err.toString());
          process.exitCode = 1;
          next(err);
        }
      });
    }
  };
};

export { simpleJsonServerPlugin as default };
