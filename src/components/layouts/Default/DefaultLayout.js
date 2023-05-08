import { Navigation } from "../Navigation/Navigation";
import { MainWrapper } from "./DefaultLayout.style";

export const DefaultLayout = ({ children }) => {
  return (
    <>
      <Navigation />
      <MainWrapper>{children}</MainWrapper>
    </>
  );
};
