import React from "react";
import { ArenaCard, WinnerCard } from "src/components";
const FightResultCardContainer = ({
  fightResult,
  winnerValue,
  lostValue,
  deleteFighter,
  fighterValue,
}) => {
  switch (fightResult) {
    case winnerValue:
      return <WinnerCard value={fighterValue} deleteFighter={deleteFighter} />;
    case lostValue:
      return <ArenaCard value={fighterValue} deleteFighter={deleteFighter} opacity={0.5} />;
    case "tie":
      return <ArenaCard value={fighterValue} deleteFighter={deleteFighter} />;
    case "":
      return <ArenaCard value={fighterValue} deleteFighter={deleteFighter} />;
    default:
      return <div></div>;
  }
};

export default FightResultCardContainer;
