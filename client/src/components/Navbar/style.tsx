import styled from "styled-components";

export const Banner = styled.div`
  background-color: var(--color-mazarin-blue);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  font-weight: 500;
  padding: 0px 2px 2px 2px;
  height: 50px;
  text-align: center;
`;

export const Nav = styled.div`
  background-color: var(--color-pico-void);
  padding: 10px;
  color: white;
`;

export const NavContent = styled.div`
  background-color: inherit;
  max-width: calc(100vw - 2 * (40vw - 38em) - 3em);
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

export const NavItem = styled.div`
  background-color: inherit;
  font-size; 1rem;
  display: flex;
  align-items: space-evenly;
`;

export const NavTitle = styled.div`
  font-weight: bold;
  font-size: 1.4rem;
  padding: 4px 10px 4px 10px;
  margin: 0px 10px 0px 10px;
  border-radius: 10px;
  background-color: var(--color-lynx-white);
`;
