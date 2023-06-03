import React from "react";

import { Winner } from "src/img";

import ArenaCard from "./ArenaCard";
import { ArenaCardContainer } from "../cardContainers";

const WinnerCard = ({ value, deleteFighter, winValue, lossValue, tieValue }) => {
  return (
    <ArenaCardContainer>
      <img src={Winner} alt="Winner" width={"200px"} height={"200px"} />
      <ArenaCard
        value={value}
        deleteFighter={deleteFighter}
        winValue={winValue}
        lossValue={lossValue}
        tieValue={tieValue}
      />
    </ArenaCardContainer>
  );
};

export default WinnerCard;
