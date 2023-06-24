const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(jsonServer.bodyParser);

server.use(middlewares);

server.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = router.db
    .get("users")
    .find({ email: email, password: password })
    .value();

  if (user) {
    res
      .status(200)
      .json({ message: "Użytkownik został pomyślnie uwierzytelniony." });
  } else {
    res.status(401).json({ error: "Nieprawidłowe dane logowania." });
  }
});

server.get("/pokemonData/:id", (req, res) => {
  const pokemonId = parseInt(req.params.id);
  const pokemonData = router.db.get("pokemonData").value();
  const pokemon = pokemonData[pokemonId - 1];

  if (pokemon) {
    res.json(pokemon);
  } else {
    res.status(404).json({ error: "Pokemon not found" });
  }
});

server.use(router);
server.listen(4100, () => {
  console.log("Serwer JSON działa na porcie 4100");
});

server.put("/pokemonData/:id", (req, res) => {
  const pokemonId = parseInt(req.params.id);
  const updatedPokemon = req.body;

  const pokemonData = router.db.get("pokemonData").value();
  const updatedPokemonData = pokemonData.map((pokemon) => {
    if (pokemon.id === pokemonId) {
      return {
        ...pokemon,
        ...updatedPokemon,
      };
    }
    return pokemon;
  });

  router.db.set("pokemonData", updatedPokemonData).write();

  const updatedPokemonResult = updatedPokemonData.find(
    (pokemon) => pokemon.id === pokemonId
  );
  if (updatedPokemonResult) {
    res.json(updatedPokemonResult);
  } else {
    res.status(404).json({ error: "Pokemon not found" });
  }
});
