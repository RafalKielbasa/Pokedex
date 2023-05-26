export default function modifyPokemon(
  arrayOfModifiedPokemon,
  setArrayOfModifiedPokemon,
  modifiedPokemon
) {
  if (
    arrayOfModifiedPokemon.some((element) => element.id === modifiedPokemon.id)
  ) {
    const indexOfModifiedPokemon = arrayOfModifiedPokemon.findIndex(
      (element) => element.id === modifiedPokemon.id
    );
    const newArrayOfModifiedPokemon = [...arrayOfModifiedPokemon];
    newArrayOfModifiedPokemon.splice(
      indexOfModifiedPokemon,
      1,
      modifiedPokemon
    );
    setArrayOfModifiedPokemon(newArrayOfModifiedPokemon);
  } else {
    setArrayOfModifiedPokemon([...arrayOfModifiedPokemon, modifiedPokemon]);
  }
}
