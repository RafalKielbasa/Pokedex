import styled from "styled-components";

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 50px 40px 50px 40px;
  width: 100vw;
`;
// const ButtonContainer = styled(Button)`
//   // display: flex;
//   // justify-content: space-between;
//   // align-items: right;
//   // margin-right: 120px;
//   padding: 0.25em 1em;
//   width: 750px;
// `;

const NavigationWrapper = ({ children, src, alt, isDark }) => {
  return (
    <NavContainer style={{ backgroundColor: isDark ? "#616161" : "white" }}>
      <img
        src={src}
        alt={alt}
        width={"580px"}
        height={"210px"}
        variant="square"
      />
      <div>{children}</div>
    </NavContainer>
  );
};
export default NavigationWrapper;
