import React, { useState } from "react";
import { Layout, MiddleContainer } from "./style";
import {
  LoginContainer,
  LoginContainerTitle,
  LoginContainerSubTitle,
  LoginContainerText,
  LoginStatus,
} from "./style";
import { Input } from "../../core-ui/Input";
import { Button } from "../../core-ui/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { passwordType, usernameType } from "../LoginPage/types";

type loggedInStatus = "failed1" | "failed2" | "null";

export const RegisterPage = (): React.ReactElement => {
  const [username, setUsername] = useState<usernameType>("");
  const [password, setPassword] = useState<passwordType>("");
  const [loggedInStatus, setLoggedInStatus] = useState<loggedInStatus>("null");

  let navigate = useNavigate();

  const handleRegister = async () => {
    let currentUsername = username;
    let currentPassword = password;
    try {
      let res = await axios.post("/auth/register/", {
        username: currentUsername,
        password: currentPassword,
      });
      navigate("/");
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
          <LoginContainerTitle>Register for MyModel</LoginContainerTitle>
          <LoginContainerSubTitle>
            Save and retrive your models.
          </LoginContainerSubTitle>
          <Input
            placeholder="Username"
            maxLength={255}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="Password"
            secure={true}
            maxLength={255}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={() => handleRegister()}>Register</Button>
          <LoginContainerText>
            {loggedInStatus === "failed1" && (
              <LoginStatus>Failed to login</LoginStatus>
            )}
            {loggedInStatus === "failed2" && (
              <LoginStatus>Failed to login</LoginStatus>
            )}
          </LoginContainerText>
        </LoginContainer>
      </MiddleContainer>
    </Layout>
  );
};
