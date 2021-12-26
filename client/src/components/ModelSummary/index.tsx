import React from "react";
import { ModelSummaryProps } from "./types";
import {
  Container,
  ContainerWrapper,
  ContainerTitle,
  ContainerSubTitle,
  MetricContainer,
} from "./style";

export const ModelSummary = ({ metrics }: ModelSummaryProps) => {
  return (
    <Container>
      <ContainerWrapper>
        <ContainerTitle>Model Summary</ContainerTitle>
      </ContainerWrapper>
      <ContainerWrapper>
        {metrics.map((metric) => {
          return (
            <MetricContainer>
              <ContainerSubTitle>{metric.name.toUpperCase()}</ContainerSubTitle>
              <ContainerSubTitle>
                {Math.round(metric.value * 100) / 100}
              </ContainerSubTitle>
            </MetricContainer>
          );
        })}
      </ContainerWrapper>
    </Container>
  );
};
