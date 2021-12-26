import React from "react";
import { ModalProps } from "./types";
import {
  ModalContainer,
  ButtonContainer,
  ModalTitle,
  ModalText,
  ModalTwoColumn,
  ModalListItem,
  ModalUnorderedList,
  ModalColumn,
} from "./style";
import { Button } from "../../core-ui/Button";

export const Modal = ({ data, updateModalStatus }: ModalProps) => {
  return (
    <ModalContainer>
      <ModalTitle>Model: {data?.name}</ModalTitle>
      <ModalText>Created on: {data?.created_date}</ModalText>
      <ModalText>Model Type: {data?.type}</ModalText>
      <ModalTwoColumn>
        <ModalColumn>
          <ModalText>Predictor Variables</ModalText>
          <ModalUnorderedList>
            {data?.predictors.map((pred) => {
              return <ModalListItem>{pred.feature_name}</ModalListItem>;
            })}
          </ModalUnorderedList>
        </ModalColumn>
        <ModalColumn>
          <ModalText>Response Variable</ModalText>
          <ModalUnorderedList>
            <ModalListItem>{data?.response.feature_name}</ModalListItem>
          </ModalUnorderedList>
        </ModalColumn>
        <ModalUnorderedList></ModalUnorderedList>
      </ModalTwoColumn>
      <ButtonContainer>
        <Button
          onClick={() => {
            updateModalStatus(false);
          }}
        >
          Close
        </Button>
      </ButtonContainer>
    </ModalContainer>
  );
};
