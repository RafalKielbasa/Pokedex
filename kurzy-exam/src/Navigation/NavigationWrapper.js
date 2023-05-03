import styled from "styled-components";
// import Avatar from "@mui/material/Avatar";

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavigationWrapper = ({ children, src, alt }) => {
  return (
    <NavContainer>
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
