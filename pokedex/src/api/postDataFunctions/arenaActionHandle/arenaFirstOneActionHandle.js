import axios from "axios";
export const arenaFirstOneActionHandle = async (
  data,
  myName,
  firstPowerLevel,
  secondPowerLevel,
  editedList
) => {
  const newData =
    firstPowerLevel === secondPowerLevel
      ? {
          ...data,
          base_experience: Number(data?.base_experience) + 2,
          winCount: Number(data?.tieCount) + 1,
        }
      : firstPowerLevel > secondPowerLevel
      ? {
          ...data,
          base_experience: Number(data?.base_experience) + 10,
          winCount: Number(data?.winCount) + 1,
        }
      : {
          ...data,
          lossCount: Number(data?.lossCount) + 1,
        };
  if (editedList.includes(myName)) {
    const response = await axios.patch(`http://localhost:3000/edited/${myName}`, newData);
    console.log("Patched1");
    return response;
  } else {
    const response = await axios.post(`http://localhost:3000/edited/`, newData);
    console.log("POST1");
    return response;
  }
};
