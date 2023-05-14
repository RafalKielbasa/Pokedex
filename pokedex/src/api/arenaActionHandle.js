import axios from "axios";
export const arenaFirstOneActionHandle = async (data, myId, firstPowerLevel, secondPowerLevel) => {
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
  try {
    let response = await axios.patch(`http://localhost:3000/edited/${myId}`, newData);
    console.log("Patched1");
    return response;
  } catch (error) {
    if (error.response.status === 404) {
      const response = await axios.post(`http://localhost:3000/edited/`, newData);
      console.log("POST1");
      return response;
    }
  }
};
export const arenaSecondOneActionHandle = async (data, myId, firstPowerLevel, secondPowerLevel) => {
  const newData =
    firstPowerLevel === secondPowerLevel
      ? {
          ...data,
          base_experience: Number(data?.base_experience) + 2,
          winCount: Number(data?.tieCount) + 1,
        }
      : firstPowerLevel < secondPowerLevel
      ? {
          ...data,
          base_experience: Number(data?.base_experience) + 10,
          winCount: Number(data?.winCount) + 1,
        }
      : {
          ...data,
          lossCount: Number(data?.lossCount) + 1,
        };
  try {
    let response = await axios.patch(`http://localhost:3000/edited/${myId}`, newData);
    console.log("Patched2");
    return response;
  } catch (error) {
    if (error.response.status === 404) {
      const response = await axios.post(`http://localhost:3000/edited/`, newData);
      console.log("POST2");
      return response;
    }
  }
};
