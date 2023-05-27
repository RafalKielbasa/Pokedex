import React from "react";
import axios from "axios";
import styled from "styled-components";
import PokemonCard from "../Components/PokemonCards";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import { getFavorites } from "src/api/source";
import { vs } from "src/Images";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const PokemonWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;
const ArenaCardsWrapper = styled.div`
  margin: 0px 155px 0px 155px;
`;

const ArenaPage = () => {
  const [battle, setBattle] = useState([]);
  const [battleIds, setBattleIds] = useState([]);

  const queryFavoritesData = useQuery(["arena"], () => getFavorites());
  const { data } = queryFavoritesData;

  const favorites = data?.data;
  const favoritesIds = favorites?.map((item) => item.id);

  const getBattle = async () => {
    const response = await axios.get(`http://localhost:3000/battle/`);
    setBattle(response.data);
    const getBattleIds = response?.data?.map((item) => item.id);
    setBattleIds(getBattleIds);
  };

  useEffect(() => {
    getBattle();
  }, []);

  console.log(`battle`, battle);
  console.log(`battleIds`, battleIds);

  return (
    <>
      <PokemonWrapper
        style={{
          backgroundImage: `url(${vs})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {battle?.map((item, index) => (
          <ArenaCardsWrapper>
            <PokemonCard
              key={index}
              id={item.id}
              pic={item.pic}
              picDet={item.picDet}
              name={item.name}
              height={item.height}
              baseexp={item.baseexp}
              weight={item.weight}
              abilitie={item.abilitie}
              battle={battle}
              battleIds={battleIds}
              favorites={favorites}
              favoritesIds={favoritesIds}
            />
          </ArenaCardsWrapper>
        ))}
      </PokemonWrapper>
      <Stack
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Button variant="outlined" sx={{ fontSize: "20px" }}>
          WALCZ !
        </Button>
      </Stack>
    </>
  );
};
export default ArenaPage;
