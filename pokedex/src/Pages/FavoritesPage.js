import React from "react";
import { useOutletContext } from "react-router-dom";

const FavoritesPage = () => {
  const { someData } = useOutletContext();
  console.log({ someData }, "Favourite");
  return <div>FavouritesPage</div>;
};

export default FavoritesPage;
