import styled from "styled-components";

export const ItemContainer = styled.div`
  background-color: white;
  margin: 10px;
  border: solid var(--color-electromagnetic);
  border-width: 3px;
  height: 200px;
  max-height: 300px;
  overflow-y: auto;
  overflow-x: auto;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #d6dee1;
    border-radius: 20px;
    border: 2px solid transparent;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: #a8bbbf;
  }
`;

export const ItemContainerEmpty = styled.div`
  padding: 10px;
  font-size: 1.5rem;
  text-align: center;
  svg {
    width: 50%;
    background-color: transparent;
  }
`;

interface Props {
  selected: boolean;
}

export const Item = styled.div<Props>`
  display: flex;
  flex-direction: row;
  justify-content: start;
  padding: 10px;
  background-color: var(--color-chain-gang-gray);
  transition: transform 0.3s;
  cursor: pointer;
  border: solid var(--color-lynx-white);
  border-width: 1px;
  color: white;
  font-weight: ${(props) => (props.selected ? "bold" : "light")};
  font-size: 0.8rem;
  &:hover {
    filter: brightness(1.2);
  }
  svg {
    margin-left: auto;
    color: white;
    background-color: inherit;
    width: 15px;
  }
`;

export const SubItem = styled.div<Props>`
  padding: 10px;
  font-size: 0.8rem;
  background-color: var(--color-hint-of-pensive);
  font-weight: ${(props) => (props.selected ? "bold" : "normal")};
  &:hover {
    opacity: 0.8;
  }
`;

export const ItemName = styled.div`
  background-color: inherit;
  width: 100%;
`;
