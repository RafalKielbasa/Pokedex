import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "./context/global";

const EditPage = () => {
  const { userInfo } = useContext(GlobalContext);
  return (
    <>
      {userInfo ? (
        <div>HIII</div>
      ) : (
        <div>
          <Link
            style={{
              color: "#1976D2",
            }}
            to="/login"
          >
            Please LOG IN to see this page.
          </Link>
        </div>
      )}
    </>
  );
};

export default EditPage;
