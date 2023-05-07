import React from "react";
import { useOutletContext } from "react-router-dom";

const ArenaPage = () => {
  const { someData } = useOutletContext();
  console.log({ someData }, "ARENA");
  return <div>ArenaPage</div>;
};

export default ArenaPage;
