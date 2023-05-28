import React, { useContext } from "react";

import styled from "styled-components";

import GlobalContext from "src/context/GlobalContext";

const MySelect = styled.select`
  height: 40px;
  width: 270px;
  background-color: ${(prop) => prop.theme.navButtonsColor};
  color: ${(prop) => prop.theme.textColor};
  margin-bottom: 15px;
`;

const SelectPokemon = ({ pokemonDataToEdit, setChosedPokemon }) => {
  const { theme } = useContext(GlobalContext);

  return (
    <MySelect
      theme={theme}
      name="chooseEditPokemon"
      type="text"
      defaultValue={""}
      onChange={(e) => setChosedPokemon(e.target.value)}
    >
      <>
        <option value=""></option>
        {pokemonDataToEdit?.map((name, index) => (
          <option key={index} value={name}>
            {name}
          </option>
        ))}
      </>
    </MySelect>
  );
};

export default SelectPokemon;
