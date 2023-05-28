import { Link } from "react-router-dom";
import styled from "styled-components";

export const StyledItem = styled.div`
  width: 100%;
  position: relative;
  padding: 0.5rem;
  box-sizing: border-box;
`;

export const StyledLink = styled(Link)`
  color: rgb(47, 129, 247);
  font-weight: 600;
  font-size: 1rem;
  text-decoration: "none";
  position: relative;
  width: fit-content;
  &:after {
    content: "";
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: rgb(47, 129, 247);
    transform: scaleX(0);
  }
  &:hover:after {
    transform: scaleX(1);
  }
`;

export const StyledDescription = styled.p`
  color: white;
  font-weight: 600;
  font-size: 14px;
  margin-top: 0rem;
`;

export const StyledInfo = styled.div`
  color: white;
  font-weight: 600;
  font-size: 1rem;
  margin-top: 0rem;
  justify-content: left;
`;

export const StyledCard = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border: 2px solid rgb(48, 54, 61);
  padding: 1rem;
  border-radius: 6px;
  padding-top: 0.5rem;
  gap: 0.5rem;
  overflow: hidden;
  border-radius: 0.5rem;
`;

export const StyledRaiting = styled.div`
  color: rgb(125, 133, 144);
`;
