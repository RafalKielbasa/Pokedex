import axios from "axios";

export default async function fetchArray(array) {
  const arrayofRecords = [];
  for (const element of array) {
    try {
      const response = await axios.get(element);
      const data = response.data;
      arrayofRecords.push(data);
    } catch (error) {
      console.log(error.response);
    }
  }
  return arrayofRecords;
}
