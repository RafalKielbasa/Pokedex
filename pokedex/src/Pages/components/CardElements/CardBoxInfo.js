import React from "react";
import styled from "styled-components";
const MyName = styled.div`
  display: flex;
  justify-content: center;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 15%;
`;
const MyColumn = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const MyValues = styled.span`
  font-size: 11px;
  margin-bottom: 5px;
`;
const MyValuesNames = styled.span`
  font-size: 12px;
  margin-bottom: 5px;
  font-weight: bold;
`;
const ColumnsConatiner = styled.div`
  display: flex;
  justify-content: space-around;
`;
const CardBoxConatiner = styled.div`
  margin-bottom: 20px;
  width: 90%;
`;
const CardBoxInfo = ({ dataToPass }) => {
  return (
    <CardBoxConatiner>
      <MyName>{dataToPass?.name?.toUpperCase()}</MyName>
      <ColumnsConatiner>
        <MyColumn>
          <MyValues>{dataToPass?.height}</MyValues>
          <MyValuesNames>Height </MyValuesNames>
          <MyValues>{dataToPass?.weight}</MyValues>
          <MyValuesNames> Weight</MyValuesNames>
        </MyColumn>
        <MyColumn>
          <MyValues>{dataToPass?.base_experience}</MyValues>
          <MyValuesNames>Base Experience</MyValuesNames>
          <MyValues>{dataToPass?.abilities[0]?.ability?.name}</MyValues>
          <MyValuesNames>Ability</MyValuesNames>
        </MyColumn>
      </ColumnsConatiner>
    </CardBoxConatiner>
  );
};

export default CardBoxInfo;
