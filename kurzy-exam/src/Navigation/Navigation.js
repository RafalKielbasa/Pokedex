import useLogic from "./useMainPage";
import { pokelogo } from "src/images";
import NavigationWrapper from "src/Navigation/NavigationWrapper";

const Navigation = () => {
  const { data } = useLogic();

  console.log(`data`, data);

  return (
    <NavigationWrapper src={pokelogo} alt={`Logo`}>
      <div>Hi</div>
    </NavigationWrapper>
  );
};

export default Navigation;
