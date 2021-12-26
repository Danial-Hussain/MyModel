import styled from "styled-components";

interface Props {
  secure?: boolean;
}

export const Input = styled.input<Props>`
  width: 100%;
  padding: 4px 10px 4px 10px;
  border: none;
  border-radius: 10px;
  color: white;
  font-size: 1rem;
  background-color: var(--color-lynx-white);
  text-security: ${(props) => (props.secure ? "disc" : "none")};
  -webkit-text-security: ${(props) => (props.secure ? "disc" : "none")};
  -moz-text-security: ${(props) => (props.secure ? "disc" : "none")};
  &:focus {
    outline: none;
    box-shadow: none;
  }
  &::placeholder {
    color: white;
    opacity: 0.2;
  }
`;

export const InputFlex = styled(Input)`
  flex: 1 1 30%;
`;
