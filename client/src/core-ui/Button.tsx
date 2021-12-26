import styled from "styled-components";

interface ButtonProps {
  disabled?: boolean;
}

export const Button = styled.div<ButtonProps>`
  flex: 1;
  background-color: var(--color-electromagnetic);
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
  text-align: center;
  border: solid black;
  border-radius: 15px;
  transition: all 0.3s ease 0s;
  padding: 4px 10px 4px 10px;
  margin: 0px 10px 0px 10px;
  cursor: pointer;
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
  &:hover {
    background-color: ${(props) =>
      props.disabled ? "none" : "var(--color-chain-gang-gray)"};
    border: ${(props) =>
      props.disabled ? "solid black" : "solid var(--color-electromagnetic)"};
  }
`;

export const IconButton = styled(Button)`
  display: inline-flex;
  gap: 5px;
  svg {
    color: white;
    background-color: inherit;
    width: 1.2rem;
  }
`;

export const LinkButton = styled.a`
  flex: 1;
  background-color: var(--color-electromagnetic);
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
  text-align: center;
  border: solid black;
  border-radius: 15px;
  transition: all 0.3s ease 0s;
  padding: 4px 10px 4px 10px;
  margin: 0px 10px 0px 10px;
  cursor: pointer;
  text-decoration: none;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  &:hover {
    background-color: var(--color-chain-gang-gray);
    border: solid var(--color-electromagnetic);
  }
  display: inline-flex;
  gap: 5px;
  svg {
    color: white;
    background-color: inherit;
    width: 1.2rem;
  }
`;
