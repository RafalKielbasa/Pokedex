const updateCurrentArray = (currentArray, arrayOfModifiedPokemon) => {
  if (!currentArray) {
    return null;
  } else {
    const currentArrayCopy = [...currentArray];
    const arrayOfModifiedIndexes = [];
    let indexOfModifiedPokemon = 0;
    arrayOfModifiedPokemon.forEach((element) => {
      if (currentArrayCopy.some((item) => item.id === element.id)) {
        const indexOfPokemon = currentArrayCopy.findIndex(
          (pokemon) => pokemon.id === element.id
        );
        arrayOfModifiedIndexes.push(indexOfPokemon);
      }
    });
    arrayOfModifiedIndexes.forEach((index) => {
      currentArrayCopy.splice(
        index,
        1,
        arrayOfModifiedPokemon[indexOfModifiedPokemon]
      );
      indexOfModifiedPokemon = indexOfModifiedPokemon + 1;
    });
    return currentArrayCopy;
  }
};

export default updateCurrentArray;
