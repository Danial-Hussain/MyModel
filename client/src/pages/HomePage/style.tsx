import styled from "styled-components";

export const Layout = styled.div`
  display: grid;
  min-height: 100vh;
  grid-template-rows: auto 1fr auto;
  grid-template-columns:
    calc(40vw - 38em)
    minmax(15%, 250px)
    1fr
    minmax(15%, 250px)
    calc(40vw - 38rem);
  gap: 1em;
`;

export const NavbarContainer = styled.div`
  grid-column: 1 / 6;
  grid-row: 1 / 2;
  width: 100%;
`;

export const LeftContainer = styled.div`
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  width: 100%;
`;

export const MiddleContainer = styled.div`
  grid-column: 3 / 4;
  grid-row: 2 / 3;
  width: 100%;
`;

export const RightContainer = styled.div`
  grid-column: 4 / 5;
  grid-row: 2 / 3;
  width: 100%;
`;

export const FooterContainer = styled.div`
  grid-column: 1 / 6;
  grid-row: 3 / 4;
  width: 100%;
`;
