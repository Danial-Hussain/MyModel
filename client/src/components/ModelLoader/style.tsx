import styled, { keyframes } from "styled-components";

export const UtilityContainer = styled.div`
  display: flex;
  gap: 10px;
  margin: 10px;
  justify-content: start;
  background-color: transparent;
`;

export const AddFolder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid black;
  border-width: 2px;
  border-radius: 10px;
  margin-left: auto;
  padding: 4px;
  background-color: var(--color-electromagnetic);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  &:hover {
    background-color: var(--color-chain-gang-gray);
  }
`;

const disappear = keyframes`
  to {
    width: 0;
    height: 0;
    overflow: hidden;
  }
`;

export const FolderStatus = styled.div`
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
