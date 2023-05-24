import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  max-width: 60%;
  margin: 0 auto;
  max-width: 600px;
  margin-top: 120px;
  padding-top: 40px;
  padding-bottom: 120px;
  border: 1px solid black;
  border-radius: 20px;
  background-color: #f0f0f0;
  box-shadow: 0px 0px 40px -16px rgba(66, 68, 90, 1);
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 80%;
  gap: 12px;
`;

export const ErrorMessage = styled.p`
  margin: 0px;
  color: #ff0000;
`;
