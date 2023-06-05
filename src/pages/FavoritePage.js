import { DefaultLayout } from "../components/layouts/Default/DefaultLayout";
import { Favorite } from "../components/wrappers/FavoriteWrapper/Favorite";

export const FavoritePage = () => {
  return (
    <DefaultLayout>
      <Favorite />
    </DefaultLayout>
  );
};
