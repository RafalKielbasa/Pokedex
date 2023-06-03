export const fighterPowerLevel = (fighter) => {
  const result = fighter?.base_experience * fighter?.weight;
  return result;
};
