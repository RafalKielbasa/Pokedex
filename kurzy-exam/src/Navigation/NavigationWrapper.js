import styled from "styled-components";
import Avatar from "@mui/material/Avatar";

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
`;

const NavigationWrapper = ({ children, src, alt }) => {
  return (
    <NavContainer>
      <Avatar src={src} alt={alt} sx={{ width: 300, height: 300 }} />
      <div>{children}</div>
    </NavContainer>
  );
};
export default NavigationWrapper;
