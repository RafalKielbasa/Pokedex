import React from "react";
import { useOutletContext } from "react-router-dom";

const EditPage = () => {
  const { someData } = useOutletContext();
  console.log({ someData }, "Edit");
  return <div>EditPage</div>;
};

export default EditPage;
