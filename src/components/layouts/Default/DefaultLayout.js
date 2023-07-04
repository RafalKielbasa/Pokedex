import { useContext } from 'react';
import { Navigation } from '../Navigation/Navigation';
import { AllPage, MainWrapper } from './DefaultLayout.style';
import { ThemeContext } from '../../../context/ThemeContext';

export const DefaultLayout = ({ children }) => {
  const { currentTheme, changeTheme } = useContext(ThemeContext);

  return (
    <AllPage theme={currentTheme}>
      <Navigation />
      <MainWrapper>{children}</MainWrapper>
    </AllPage>
  );
};
