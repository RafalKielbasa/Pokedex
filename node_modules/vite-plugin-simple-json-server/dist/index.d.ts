import { Connect, LogLevel, Plugin } from 'vite';
export { LogLevel } from 'vite';
import { ServerResponse } from 'node:http';

type MockFunction = {
  (req: Connect.IncomingMessage, res: ServerResponse, urlVars?: Record<string, string>): void;
};

type MockHandler = {
  pattern: string;
  method?: string;
  handle: MockFunction;
};

type SimpleJsonServerPluginOptions = {
  disable?: boolean;
  logLevel?: LogLevel;
  urlPrefixes?: string[];
  handlers?: MockHandler[];
  mockDir?: string;
  staticDir?: string;
  noHandlerResponse404?: boolean;
  limit?: number;
  delay?: number;
};

declare const simpleJsonServerPlugin: (opts?: SimpleJsonServerPluginOptions) => Plugin;

export { MockFunction, MockHandler, SimpleJsonServerPluginOptions, simpleJsonServerPlugin as default };
