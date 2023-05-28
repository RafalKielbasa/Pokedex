export const filterOnlyNeedData = (data) => {
  const filteredQueriesKeys = [
    "abilities",
    "base_experience",
    "height",
    "id",
    "name",
    "sprites",
    "weight",
    "winCount",
    "lossCount",
    "tieCount",
  ];
  const filteredData = Object.fromEntries(
    Object.entries(data)?.filter(([key]) => filteredQueriesKeys.includes(key))
  );
  return filteredData;
};
