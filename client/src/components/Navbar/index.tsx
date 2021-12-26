import React from "react";
import { Banner, Nav, NavContent, NavItem, NavTitle } from "./style";
import { IconButton } from "../../core-ui/Button";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Learn } from "../Icons/info.svg";
import { ReactComponent as Hammer } from "../Icons/hammer.svg";
import { ReactComponent as Compare } from "../Icons/compare.svg";
import { ReactComponent as Logout } from "../Icons/logout.svg";
import { NavProps } from "./types";

export const Navbar = ({ logout }: NavProps): React.ReactElement => {
  let navigate = useNavigate();

  return (
    <>
      <Banner>Build, Validate, and Compare Machine Learning Models!</Banner>
      <Nav>
        <NavContent>
          <NavItem>
            <NavTitle>MyModel</NavTitle>
          </NavItem>
          <NavItem>
            <IconButton
              onClick={() => {
                navigate("/home");
              }}
            >
              <Hammer />
              Build
            </IconButton>
            <IconButton
              onClick={() => {
                navigate("/compare");
              }}
            >
              <Compare />
              Compare
            </IconButton>
            <IconButton
              onClick={() => {
                navigate("/learn");
              }}
            >
              <Learn />
              Learn
            </IconButton>
          </NavItem>
          <NavItem>
            <IconButton
              onClick={() => {
                logout();
                navigate("/");
              }}
            >
              <Logout />
              Logout
            </IconButton>
          </NavItem>
        </NavContent>
      </Nav>
    </>
  );
};
