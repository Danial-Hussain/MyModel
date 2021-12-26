import React, { useState } from "react";
import { Layout, LoginStatus, MiddleContainer } from "./style";
import { useNavigate } from "react-router-dom";
import {
  LoginContainer,
  LoginContainerTitle,
  LoginContainerSubTitle,
  LoginContainerText,
} from "./style";
import { Input } from "../../core-ui/Input";
import { LinkButton } from "../../core-ui/Button";
import axios from "axios";
import {
  passwordType,
  usernameType,
  loggedInStatus,
  LoginPageProps,
} from "./types";

export const LoginPage = ({
  updateLoggedIn,
  updateUsername,
}: LoginPageProps): React.ReactElement => {
  const [username, setUsername] = useState<usernameType>("");
  const [password, setPassword] = useState<passwordType>("");
  const [loggedInStatus, setLoggedInStatus] = useState<loggedInStatus>("null");

  let navigate = useNavigate();

  const handleLogin = async (guest?: boolean) => {
    let currentUsername = username;
    let currentPassword = password;
    if (guest) {
      currentUsername = "guest";
      currentPassword = "guest";
    }
    try {
      let res = await axios.post("/auth/login/", {
        username: currentUsername,
        password: currentPassword,
      });
      let jwt = res.data.jwt;
      updateLoggedIn(true);
      updateUsername(currentUsername);
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("username", currentUsername);
      localStorage.setItem("token", jwt);
      navigate("/home");
    } catch (error: any) {
      console.log(error.response.data);
      loggedInStatus === "failed1"
        ? setLoggedInStatus("failed2")
        : setLoggedInStatus("failed1");
    }
  };

  return (
    <Layout>
      <MiddleContainer>
        <LoginContainer>
          <LoginContainerTitle>Login to MyModel</LoginContainerTitle>
          <LoginContainerSubTitle>
            Sign in to save and load models.
          </LoginContainerSubTitle>
          <Input
            placeholder="Username"
            maxLength={255}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="Password"
            maxLength={255}
            secure={true}
            onChange={(e) => setPassword(e.target.value)}
          />
          <LinkButton
            onClick={() => {
              handleLogin();
            }}
          >
            Login
          </LinkButton>
          <LinkButton
            onClick={() => {
              handleLogin(true);
            }}
          >
            Guest
          </LinkButton>
          <LinkButton href="/register">Register</LinkButton>
          <LoginContainerText>
            {loggedInStatus === "failed1" && (
              <LoginStatus>Failed to login</LoginStatus>
            )}
            {loggedInStatus === "failed2" && (
              <LoginStatus>Failed to login</LoginStatus>
            )}
          </LoginContainerText>
          <LoginContainerText>
            Want to try it out first? Continue as guest.
          </LoginContainerText>
        </LoginContainer>
      </MiddleContainer>
    </Layout>
  );
};
