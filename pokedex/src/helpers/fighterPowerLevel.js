export const fighterPowerLevel = (fighter) => {
  const result = fighter?.data?.data?.base_experience * fighter?.data?.data?.weight;
  return result;
};
