import { DefaultLayout } from "../components/layouts/Default/DefaultLayout";
import { HomePageWrapper } from "../components/wrappers/HomePageWrapper/HomePageWrapper";
import { getAllPokemon } from "../services/api";

export const HomePage = () => {
  getAllPokemon();
  return (
    <DefaultLayout>
      <HomePageWrapper />
    </DefaultLayout>
  );
};
