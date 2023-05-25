import React from "react";
import { Searcher, MySwitch } from "src/components";
import styled from "styled-components";

const HeaderConatiner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const PageHeader = ({
  handleSearcherChange,
  toggleOnlyLocalPokemonsHandle,
  checkedValue,
}) => {
  return (
    <HeaderConatiner>
      <Searcher handleSearcherChange={handleSearcherChange} />
      <MySwitch
        checkedValue={checkedValue}
        onClickAction={toggleOnlyLocalPokemonsHandle}
        title={"Pokaż tylko edytowane/stworzone"}
      />
    </HeaderConatiner>
  );
};

export default PageHeader;
