import styled from "styled-components";

export const Container = styled.div`
  margin: 20px;
  background-color: var(--color-electromagnetic);
  border: solid black;
  border-width: 5px;
  min-height: 200px;
`;

export const ContainerWrapper = styled.div`
  background-color: transparent;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  justify-content: center;
`;

export const ContainerTitle = styled.div`
  background-color: transparent;
  padding: 2px 4px 2px 4px;
  margin: 5px;
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
`;

export const ContainerSubTitle = styled.div`
  background-color: transparent;
  padding: 2px 4px 2px 4px;
  margin: 5px;
  color: white;
  font-size: 1rem;
  text-align: center;
`;

export const MetricContainer = styled.div`
  background-color: var(--color-lynx-white);
  color: white;
  border-radius: 10px;
  margin: 5px;
  min-width: 150px;
`;
