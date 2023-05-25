import React from "react";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getFullResults } from "src/api/source";

const ArenaPage = () => {
  const queryFullData = useQuery(["arena"], () => getFullResults());

  const test = queryFullData?.data?.toSpliced(0, 1);
  // console.log(`queryFullData`, queryFullData.data);
  console.log(`test`, test);

  return <div>ArenaPage</div>;
};
export default ArenaPage;
