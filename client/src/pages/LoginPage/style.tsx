import styled, { keyframes } from "styled-components";

export const Layout = styled.div`
  margin: 0;
  display: grid;
  grid-template-columns:
    calc(40vw - 38em)
    1fr
    calc(40vw - 38rem);
  place-items: center;
  height: 100vh;
  background: rgb(47, 54, 64);
  background: linear-gradient(
    142deg,
    rgba(47, 54, 64, 1) 9%,
    rgba(105, 105, 105, 1) 53%,
    rgba(220, 221, 225, 1) 100%
  );
`;

export const MiddleContainer = styled.div`
  grid-column: 2 / 3;
  background-color: transparent;
  padding: 20px;
  width: 50%;
`;

export const LoginContainer = styled.div`
  display: flex;
  row-gap: 10px;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-evenly;
  background-color: dimgray;
  padding: 40px;
  border: solid black;
  border-width: 5px;
  border-radius: 10px;
`;

export const LoginContainerTitle = styled.div`
  flex: 1 1 100%;
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  color: white;
  background-color: transparent;
`;

export const LoginContainerSubTitle = styled.div`
  flex: 1 1 100%;
  text-align: center;
  font-size: 1.5rem;
  font-weight: lighter;
  color: white;
  background-color: transparent;
`;

export const LoginContainerText = styled.div`
  flex: 1 1 100%;
  text-align: center;
  font-size: 1rem;
  font-weight: lighter;
  color: white;
  background-color: transparent;
`;

const disappear = keyframes`
  to {
    width: 0;
    height: 0;
    overflow: hidden;
  }
`;

export const LoginStatus = styled.div`
  background-color: transparent;
  text-align: center;
  color: white;
  font-weight: lighter;
  -moz-animation: ${disappear} 0s ease-in 3s forwards;
  -webkit-animation: ${disappear} 0s ease-in 3s forwards;
  animation: ${disappear} 0s ease-in 3s forwards;
  -webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
`;
