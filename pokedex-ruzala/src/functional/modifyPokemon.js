export default function modifyPokemon(
  arrayOfModifiedPokemon,
  setArrayOfModifiedPokemon,
  modifiedPokemon
) {
  const newModifiedPokemon = { ...modifiedPokemon };
  console.log(newModifiedPokemon);
  if (
    arrayOfModifiedPokemon.some(
      (element) => element.id === newModifiedPokemon.id
    )
  ) {
    const indexOfModifiedPokemon = arrayOfModifiedPokemon.findIndex(
      (element) => element.id === newModifiedPokemon.id
    );
    const newArrayOfModifiedPokemon = [...arrayOfModifiedPokemon];
    newArrayOfModifiedPokemon.splice(
      indexOfModifiedPokemon,
      1,
      newModifiedPokemon
    );
    console.log(newArrayOfModifiedPokemon);
    setArrayOfModifiedPokemon(newArrayOfModifiedPokemon);
  } else {
    setArrayOfModifiedPokemon([...arrayOfModifiedPokemon, newModifiedPokemon]);
  }
}
