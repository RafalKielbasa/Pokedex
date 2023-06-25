import axios from "axios";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { GlobalContext } from "./context/global";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledLink = styled(Link)`
  margin-right: 5px;
  font-weight: bold;
  color: black;
`;

const Body = styled.body`
  min-height: 100vh;
  background-color: ${({ swich }) => (swich ? "#394867" : "#d4f1f4")};
`;

const Wrapper = styled.div`
  padding: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  width: 48%;
  padding: 10px;
  border-radius: 5px;
  border: none;
  background-color: #007bff;
  color: white;
`;

const Info = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  font-weight: bold;
`;

const schema = yup.object().shape({
  name: yup.string().required(),
  weight: yup.number().required(),
  height: yup.number().required(),
  ability: yup.string().required(),
  base_exp: yup.number().required(),
});

const EditPage = () => {
  const { pokemons, setPokemons, userInfo, swich } = useContext(GlobalContext);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const selectPokemon = (event) => {
    const pokemon = pokemons.find(
      (pokemon) => pokemon.name === event.target.value
    );
    setSelectedPokemon(pokemon);
  };

  const onSubmit = (data) => {
    const isNewPokemon = !selectedPokemon.isSaved;

    if (isNewPokemon) {
      axios
        .post("http://localhost:3000/pokemons", {
          ...data,
          id: Date.now(),
          isSaved: true,
          img: selectedPokemon.img,
          type: selectedPokemon.type,
          favorite: selectedPokemon.favorite,
          edited: selectedPokemon.edited,
          fight: selectedPokemon.fight,
          wins: selectedPokemon.wins,
          lose: selectedPokemon.lose,
        })
        .then((response) => {
          setPokemons([...pokemons, response.data]);
          reset();
          alert("Pokemon uptade successfully.");
        })
        .catch((error) => console.error("Error:", error));
    } else {
      axios
        .patch(`http://localhost:3000/pokemons/${selectedPokemon.id}`, {
          ...data,
        })
        .then((response) => {
          setPokemons(
            pokemons.map((pokemon) =>
              pokemon.id === selectedPokemon.id ? response.data : pokemon
            )
          );
          setSelectedPokemon(response.data);
          alert("Pokemon updated successfully.");
        })
        .catch((error) => console.error("Error:", error));
    }
  };

  const saveAsNew = () => {
    handleSubmit((data) => {
      axios
        .post("http://localhost:3000/pokemons", {
          ...data,
          id: Date.now(),
          isSaved: true,
          img: selectedPokemon.img,
          type: selectedPokemon.type,
          favorite: false,
          edited: false,
          fight: false,
          isSaved: true,
          wins: 0,
          lose: 0,
        })
        .then((response) => {
          console.log("Before setPokemons", pokemons);
          setPokemons([...pokemons, response.data]);
          console.log("After setPokemons", pokemons);
          reset();
          alert("Pokemon saved as new successfully.");
        })
        .catch((error) => console.error("Error:", error));
    })();
  };

  return (
    <Body swich={swich}>
      {userInfo ? (
        <Wrapper>
          <h1>Edit/Create Pokemon</h1>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Select name="pokemon" onChange={selectPokemon}>
              <option value="">Choose a Pokemon</option>
              {pokemons.map((pokemon) => (
                <option key={pokemon.id} value={pokemon.name}>
                  {pokemon.name}
                </option>
              ))}
            </Select>

            <Input
              defaultValue={selectedPokemon?.name}
              {...register("name")}
              placeholder="Name"
            />
            {errors.name && <p>{errors.name.message}</p>}

            <Input
              defaultValue={selectedPokemon?.weight}
              {...register("weight")}
              placeholder="Weight"
            />
            {errors.weight && <p>{errors.weight.message}</p>}

            <Input
              defaultValue={selectedPokemon?.height}
              {...register("height")}
              placeholder="Height"
            />
            {errors.height && <p>{errors.height.message}</p>}

            <Input
              defaultValue={selectedPokemon?.ability}
              {...register("ability")}
              placeholder="Ability"
            />
            {errors.ability && <p>{errors.ability.message}</p>}

            <Input
              defaultValue={selectedPokemon?.base_exp}
              {...register("base_exp")}
              placeholder="Base Experience"
            />
            {errors.base_exp && <p>{errors.base_exp.message}</p>}
            <ButtonContainer>
              <Button type="submit">SAVE</Button>
              <Button type="button" onClick={saveAsNew}>
                SAVE AS NEW
              </Button>
            </ButtonContainer>
          </Form>
        </Wrapper>
      ) : (
        <Info>
          <StyledLink to="/login">LOG IN</StyledLink>to see this page.
        </Info>
      )}
    </Body>
  );
};

export default EditPage;
