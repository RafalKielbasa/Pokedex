export const filterFnc = (data, filterKey) => {
  const filteredData = data.filter((value) => value.name.includes(filterKey.toLowerCase()));
  return filteredData;
};
