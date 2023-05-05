import React from "react";
import { Input } from "semantic-ui-react";
import styled from "styled-components";

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const Login = () => {
  return (
    <Main>
      <div
        style={{
          width: "80%",
        }}
        class="ui placeholder segment"
      >
        <div class="ui two column very relaxed stackable grid">
          <div class="column">
            <div class="ui form">
              <div class="field">
                <label>Username</label>
                <div class="ui left icon input">
                  <Input
                    type="email"
                    placeholder="email"
                    icon="user icon"
                  ></Input>
                </div>
              </div>
              <div class="field">
                <label>Password</label>
                <div class="ui left icon input">
                  <Input
                    type="password"
                    placeholder="password"
                    icon="lock icon"
                  ></Input>
                </div>
              </div>
              <div class="ui blue submit button">Login</div>
            </div>
          </div>
          <div class="middle aligned column">
            <div class="ui blue big button">
              <i class="signup icon"></i>
              Sign Up
            </div>
          </div>
        </div>
        <div class="ui vertical divider">Or</div>
      </div>
    </Main>
  );
};

export default Login;
