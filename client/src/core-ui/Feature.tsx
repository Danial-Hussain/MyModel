import styled from "styled-components";

export const FeatureContainer = styled.div`
  background-color: var(--color-electromagnetic);
  border-radius: 10px;
  padding: 1px;
  margin: 5px;
`;

interface Props {
  height?: string;
}

export const FeatureWrapper = styled.div<Props>`
  background-color: var(--color-lynx-white);
  border-radius: 10px;
  padding: 5px;
  margin: 5px;
  min-height: ${(props) => props.height};
`;

export const FeatureTitle = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
  color: white;
  background-color: transparent;
  padding-bottom: 10px;
`;

export const FeatureSubTitle = styled.div`
  font-size: 1rem;
  font-weight: lighter;
  text-align: center;
  color: white;
  background-color: transparent;
`;
