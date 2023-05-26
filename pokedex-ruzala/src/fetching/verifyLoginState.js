import fetchData from "./fetchData";

const verifyLoginState = async (loginStateSetter) => {
  const loggedUser = JSON.parse(localStorage.getItem("user"));
  if (loggedUser) {
    const users = await fetchData("http://localhost:5000/users");
    const isRegistered = users.some(
      (user) =>
        user.userName === loggedUser.userName &&
        user.password === loggedUser.password
    );
    loginStateSetter(isRegistered);
  }
};

export default verifyLoginState;
