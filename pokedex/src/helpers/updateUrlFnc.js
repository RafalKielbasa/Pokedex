export const updateUrlFnc = (results, editedList) =>
  results?.map(({ name, url }) => {
    let value = null;
    editedList?.includes(name)
      ? (value = {
          name,
          url: `http://localhost:3000/edited/${name}`,
        })
      : (value = { name, url });
    return value;
  });
