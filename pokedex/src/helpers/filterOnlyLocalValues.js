export const filterOnlyLocalValues = (data, keyList) => {
  const filteredData = Object.values(data)?.filter(({ name, url }) =>
    keyList.includes(name)
  );

  return filteredData;
};
