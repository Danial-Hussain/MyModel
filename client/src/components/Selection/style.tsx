import styled from "styled-components";
import Select from "react-select";

export const SelectContainer = styled.div`
  padding-left: 10px;
  padding-right: 10px;
  background-color: transparent;
  width: 100%;
`;

export const SelectElement = styled(Select)`
  .Select__option {
    color: white;
    background-color: var(--color-chain-gang-gray);
    font-size: 0.8rem;
    &:hover {
      filter: brightness(1.2);
    }
  }
`;
