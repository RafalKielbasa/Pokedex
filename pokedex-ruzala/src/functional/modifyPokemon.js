export default function modifyPokemon(
  arrayOfModifiedPokemon,
  setArrayOfModifiedPokemon,
  modifiedPokemon
) {
  if (
    arrayOfModifiedPokemon.some((element) => element.id === modifiedPokemon.id)
  ) {
    console.log("juz jest");
    console.log(arrayOfModifiedPokemon);
    console.log(modifiedPokemon);
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
    console.log("jeszcze nie ma");
    console.log(arrayOfModifiedPokemon);
    console.log(modifiedPokemon);
    setArrayOfModifiedPokemon([...arrayOfModifiedPokemon, modifiedPokemon]);
  }
}
