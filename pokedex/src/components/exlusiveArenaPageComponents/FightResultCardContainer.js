import React from "react";
import { ArenaCard, WinnerCard } from "src/components";
const FightResultCardContainer = ({
  fightResult,
  winnerValue,
  lostValue,
  deleteFighter,
  fighterValue,
  winValue,
  lossValue,
  tieValue,
}) => {
  switch (fightResult) {
    case winnerValue:
      return (
        <WinnerCard
          value={fighterValue}
          deleteFighter={deleteFighter}
          winValue={winValue}
          lossValue={lossValue}
          tieValue={tieValue}
        />
      );
    case lostValue:
      return (
        <ArenaCard
          value={fighterValue}
          deleteFighter={deleteFighter}
          winValue={winValue}
          lossValue={lossValue}
          tieValue={tieValue}
          opacity={0.5}
        />
      );
    case "tie":
      return (
        <ArenaCard
          value={fighterValue}
          deleteFighter={deleteFighter}
          winValue={winValue}
          lossValue={lossValue}
          tieValue={tieValue}
        />
      );
    case "":
      return (
        <ArenaCard
          value={fighterValue}
          deleteFighter={deleteFighter}
          winValue={winValue}
          lossValue={lossValue}
          tieValue={tieValue}
        />
      );
    default:
      return <div></div>;
  }
};

export default FightResultCardContainer;
