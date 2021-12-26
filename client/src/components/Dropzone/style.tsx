import styled from "styled-components";

const getColor = (props: any) => {
  if (props.isDragAccept) {
    return "#00e676";
  }
  if (props.isDragReject) {
    return "#ff1744";
  }
  if (props.isDragActive) {
    return "#2196f3";
  }
  return "black";
};

export const DropzoneContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  border-color: ${(props) => getColor(props)};
  border-style: dashed;
  background-color: var(--color-lynx-white);
  outline: none;
  transition: border 0.24s ease-in-out;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;

export const DropzoneText = styled.div`
  background-color: transparent;
`;
