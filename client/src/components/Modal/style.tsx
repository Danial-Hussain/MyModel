import styled from "styled-components";

export const ModalContainer = styled.div`
  min-width: 500px;
  min-height: 250px;
  z-index: 10;
  top: 50%;
  left: 50%;
  border-radius: 16px;
  position: absolute;
  transform: translate(-50%, -50%);
  padding: 20px;
  background: lightgray;
  backdrop-filter: blur(5px);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.04);
  -moz-box-shadow: 0 0 10px rgba(0, 0, 0, 0.04);
  -webkit-box-shadow: 0 0 10px rgba(0, 0, 0, 0.04);
  -o-box-shadow: 0 0 10px rgba(0, 0, 0, 0.04);
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
`;

export const ModalTitle = styled.div`
  color: black;
  font-size: 1.5rem;
  font-weight: bold;
  background-color: transparent;
  border-radius: 15px;
  padding: 8px;
`;

export const ModalText = styled.div`
  color: var(--color-chain-gang-gray);
  font-size: 1rem;
  background-color: transparent;
  border-radius: 15px;
  margin: 5px;
`;

export const ButtonContainer = styled.div`
  max-width: 180px;
  background-color: transparent;
  margin: 10px;
`;

export const ModalTwoColumn = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  background-color: transparent;
`;

export const ModalColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-self: start;
  background-color: transparent;
`;

export const ModalUnorderedList = styled.ul`
  background-color: transparent;
`;

export const ModalListItem = styled.li`
  color: var(--color-chain-gang-gray);
  background-color: transparent;
`;
