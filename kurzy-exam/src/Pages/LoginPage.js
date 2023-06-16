import React from "react";
import { useEffect, useState, useContext } from "react";

const LoginPage = () => {
  return (
    <form>
      <label for="email">email</label>
      <input type="email" placeholder="podaj e-mail" id="email" name="email" />
      <label for="password">password</label>
      <input type="email" placeholder="podaj e-mail" id="email" name="email" />
    </form>
  );
};
export default LoginPage;
