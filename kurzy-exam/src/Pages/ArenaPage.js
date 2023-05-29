import React from "react";
import axios from "axios";
import styled from "styled-components";
import { BlankPokemonCard, ArenaPokemonCard } from "../Components/PokemonCards";
import { useEffect, useState } from "react";
import { vs } from "src/Images";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import BasicModal, { DrawModal } from "src/Components/Modal";
import { postData } from "src/api/postData";
import { useNavigate } from "react-router-dom";

const PokemonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const ArenaCardsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 310px;
`;

const ArenaPage = () => {
  const [battle, setBattle] = useState([]);
  const [battleIds, setBattleIds] = useState([]);
  const [afterBattle, setAfterBattle] = useState([]);
  const [afterBattleIds, setAfterBattleIds] = useState([]);
  const [winner, setWinner] = useState([]);
  const [winnerPic, setWinnerPic] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();

  const getBattle = async () => {
    const response = await axios.get(`http://localhost:3000/battle/`);
    setBattle(response.data);
    const getBattleIds = response?.data?.map((item) => item.id);
    setBattleIds(getBattleIds);
  };

  useEffect(() => {
    getBattle();
  }, []);

  const getAfterTheBattle = async () => {
    const response = await axios.get(`http://localhost:3000/afterTheBattle/`);
    setAfterBattle(response.data);
    const getBattleIds = response?.data?.map((item) => item.id);
    setAfterBattleIds(getBattleIds);
  };

  useEffect(() => {
    getAfterTheBattle();
  }, []);

  const removeFromArena1 = () => {
    if (battle[0]) {
      axios.delete(`http://localhost:3000/battle/${battle[0].id}`);
      window.location.reload(false);
    }
  };
  const removeFromArena2 = () => {
    if (battle[1]) {
      axios.delete(`http://localhost:3000/battle/${battle[1].id}`);
      window.location.reload(false);
    }
  };

  const fight = () => {
    const fighter1Stat = battle[0].baseexp * battle[0].weight;
    const fighter2Stat = battle[1].baseexp * battle[1].weight;
    if (fighter1Stat > fighter2Stat) {
      console.log("Fighter1 wygrywa");
      setWinner(battle[0].name);
      setWinnerPic(battle[0].pic);
      setOpen(true);
    } else if (fighter1Stat < fighter2Stat) {
      console.log("Fighter2 wygrywa");
      setWinner(battle[1].name);
      setWinnerPic(battle[1].pic);
      setOpen(true);
    } else if (fighter1Stat === fighter2Stat) {
      console.log("Remis");
      setOpen2(true);
    }
  };

  const finalResults = () => {
    const fighter1Stat = battle[0].baseexp * battle[0].weight;
    const fighter2Stat = battle[1].baseexp * battle[1].weight;
    if (fighter1Stat > fighter2Stat && !afterBattleIds.includes(battle[0].id)) {
      console.log("Fighter1 wygrywa");
      postData(
        "afterTheBattle",
        battle[0].id,
        battle[0].pic,
        battle[0].picDet,
        battle[0].name,
        battle[0].height,
        battle[0].baseexp + 10,
        battle[0].weight,
        battle[0].abilitie
      );
      axios.delete(`http://localhost:3000/battle/${battle[0].id}`);
      axios.delete(`http://localhost:3000/battle/${battle[1].id}`);
      setOpen(false);
      navigate("/");
    } else if (
      fighter1Stat > fighter2Stat &&
      afterBattleIds.includes(battle[0].id)
    ) {
      console.log("Fighter1 wygrywa");
      axios.delete(`http://localhost:3000/afterTheBattle/${battle[0].id}`);
      postData(
        "afterTheBattle",
        battle[0].id,
        battle[0].pic,
        battle[0].picDet,
        battle[0].name,
        battle[0].height,
        battle[0].baseexp + 10,
        battle[0].weight,
        battle[0].abilitie
      );
      axios.delete(`http://localhost:3000/battle/${battle[0].id}`);
      axios.delete(`http://localhost:3000/battle/${battle[1].id}`);
      setOpen(false);
      navigate("/");
    } else if (
      fighter1Stat < fighter2Stat &&
      !afterBattleIds.includes(battle[1].id)
    ) {
      console.log("Fighter2 wygrywa");
      postData(
        "afterTheBattle",
        battle[1].id,
        battle[1].pic,
        battle[1].picDet,
        battle[1].name,
        battle[1].height,
        battle[1].baseexp + 10,
        battle[1].weight,
        battle[1].abilitie
      );
      axios.delete(`http://localhost:3000/battle/${battle[0].id}`);
      axios.delete(`http://localhost:3000/battle/${battle[1].id}`);
      setOpen(false);
      navigate("/");
    } else if (
      fighter1Stat < fighter2Stat &&
      afterBattleIds.includes(battle[1].id)
    ) {
      console.log("Fighter2 wygrywa");
      axios.delete(`http://localhost:3000/afterTheBattle/${battle[1].id}`);
      postData(
        "afterTheBattle",
        battle[1].id,
        battle[1].pic,
        battle[1].picDet,
        battle[1].name,
        battle[1].height,
        battle[1].baseexp + 10,
        battle[1].weight,
        battle[1].abilitie
      );
      axios.delete(`http://localhost:3000/battle/${battle[0].id}`);
      axios.delete(`http://localhost:3000/battle/${battle[1].id}`);
      setOpen(false);
      navigate("/");
    } else if (fighter1Stat === fighter2Stat) {
      console.log("Remis");
      axios.delete(`http://localhost:3000/battle/${battle[0].id}`);
      axios.delete(`http://localhost:3000/battle/${battle[1].id}`);
      setOpen2(false);
      navigate("/");
    }
  };

  return (
    <>
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: "800px",
        }}
      >
        <Button
          disabled={battle[0] ? false : true}
          className="fighter1"
          variant="outlined"
          onClick={() => removeFromArena1()}
        >
          Usuń
        </Button>
        <Button
          disabled={battle[1] ? false : true}
          className="fighter2"
          variant="outlined"
          onClick={() => removeFromArena2()}
        >
          Usuń
        </Button>
      </Stack>
      <PokemonWrapper
        style={{
          backgroundImage: `url(${vs})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <ArenaCardsWrapper>
          {battle[0] ? (
            <>
              <ArenaPokemonCard
                id={battle[0].id}
                pic={battle[0].pic}
                picDet={battle[0].picDet}
                name={battle[0].name}
                height={battle[0].height}
                baseexp={battle[0].baseexp}
                weight={battle[0].weight}
                abilitie={battle[0].abilitie}
              />
            </>
          ) : (
            <BlankPokemonCard />
          )}
          {battle[1] ? (
            <ArenaPokemonCard
              id={battle[1].id}
              pic={battle[1].pic}
              picDet={battle[1].picDet}
              name={battle[1].name}
              height={battle[1].height}
              baseexp={battle[1].baseexp}
              weight={battle[1].weight}
              abilitie={battle[1].abilitie}
            />
          ) : (
            <BlankPokemonCard />
          )}
        </ArenaCardsWrapper>
      </PokemonWrapper>
      <Stack
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Button
          disabled={battle.length === 2 ? false : true}
          variant="outlined"
          sx={{ fontSize: "20px" }}
          onClick={() => fight()}
        >
          WALCZ !
        </Button>
      </Stack>
      <BasicModal
        open={open}
        handleClose={handleClose}
        winner={winner}
        winnerPic={winnerPic}
        finalResults={finalResults}
      />
      <DrawModal
        open2={open2}
        handleClose={handleClose}
        finalResults={finalResults}
      />
    </>
  );
};
export default ArenaPage;
