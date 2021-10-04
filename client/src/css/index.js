import styled from "styled-components";
import { Link } from "react-router-dom";

export const Button = styled.button`
  width: ${(props) => props.width || "5rem"};
  padding: ${(props) => props.padding || 0};
  height: ${(props) => props.height || "2.5rem;"};
  display: flex;
  align-items: center;
  justify-content: ${(props) => props.justify || "center"};
  color: rgb(255, 255, 255);
  text-transform: uppercase;
  background-color: ${(props) => props.buttonColor || "rgb(0, 160, 210)"};
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 600;
`;

export const Header = styled.header`
  padding: 1.56rem 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 5.62rem;
  background-color: rgb(61, 61, 61);
  @media screen and (max-width: 524px) {
    padding: 1.2rem 2rem;
  }
`;

export const Title = styled.h1`
  color: rgb(255, 255, 255);
  font-size: 2rem;
  margin: 0;
`;

export const StyledLink = styled(Link)`
  color: rgb(255, 255, 255);
  text-decoration: none;
  margin-right: ${(props) => props.margin || 0};
  grid-row: ${(props) => props.gridRow || "unset"};
  grid-column: ${(props) => props.gridColumn || "unset"};
  width: ${(props) => props.width || "unset"};
  justify-self: ${(props) => props.justifySelf || "unset"};
  &:hover {
    text-decoration: ${(props) => props.hoverUnderline || "none"};
  }
`;

export const OptionsBar = styled.div`
  padding: 0 4rem;
  display: flex;
  gap: 0 1.56rem;
  justify-content: flex-end;
  align-items: center;
  background-color: rgb(208, 208, 208);
  height: 5rem;
`;

export const Body = styled.section`
  width: 100%;
  height: 100%;
  padding: ${(props) => props.padding || "0 4rem"};
  display: ${(props) => props.display || "grid"};
  justify-content: ${(props) => props.justifycontent || "unset"};
  grid-template-columns: 1fr 1fr;
  gap: 2rem 0;
`;