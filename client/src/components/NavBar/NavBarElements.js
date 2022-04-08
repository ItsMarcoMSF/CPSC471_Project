import styled from "styled-components";
import { FaTimes } from "react-icons/fa";

export const NavBarWrapper = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #2e2e2e;

  @media screen and (max-width: 800px) {
    position: absolute;
    z-index: 1;
    transition: 0.3s ease-in-out;
    left: ${({ isOpen }) => (isOpen ? "0" : "-100%")};
    width: 100%;
  }
`;

export const CloseIcon = styled(FaTimes)`
  color: #fff;
`;

export const Icon = styled.div`
  display: none;

  @media screen and (max-width: 800px) {
    display: ${({ isOpen }) => (isOpen ? "block" : "none")};
    position: absolute;
    top: 1.2rem;
    right: 1.5rem;
    background: transparent;
    font-size: 2rem;
    cursor: pointer;
    outline: none;
  }
`;
