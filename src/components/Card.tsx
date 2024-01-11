/* eslint-disable react/require-default-props */
import styled from "styled-components";

import { useLocation } from "react-router-dom";
import { useState } from "react";
import threeDots from "../assets/images/three-dots.svg";
// import moduleImg from "../assets/images/class-sample.png";
import { IUserContext, useUserContext } from "../contexts/UserContext";
import MenuDrop from "./MenuDrop";
import * as moduleService from "../services/moduleService";
import * as classService from "../services/classService";

export interface ICardProps {
  id: string;
  moduleName: string;
  description?: string;
  imageUrl: string;
  isEnabled: boolean;
  onClick: () => void;
  updateEntity: () => void;
}

export default function Card({
  id,
  moduleName,
  description,
  imageUrl,
  isEnabled,
  onClick,
  updateEntity,
}: ICardProps) {
  const [showMenu, setShowMenu] = useState<boolean>();
  const { user } = useUserContext() as IUserContext;
  const path = useLocation().pathname;
  const type = description ? "módulo" : "aula";

  function toggleMenu(e: React.MouseEvent<HTMLImageElement, MouseEvent>) {
    e.stopPropagation();
    setShowMenu(!showMenu);
  }

  async function enableOrDisableOne() {
    if (!user?.token) return;

    const enableOrDisable = isEnabled ? "disable" : "enable";

    let fn;

    if (type === "módulo") {
      fn = moduleService.enableOrDisableOne;
    } else {
      fn = classService.enableOrDisableOne;
    }

    try {
      await fn(user?.token, id, enableOrDisable);

      updateEntity();
    } catch (error) {
      alert(error);
    }
  }

  async function deleteOne() {
    if (!user?.token) return;

    let fn;

    if (type === "módulo") {
      fn = moduleService.deleteOne;
    } else {
      fn = classService.deleteOne;
    }

    try {
      await fn(user?.token, id);

      updateEntity();
    } catch (error) {
      alert(error);
    }
  }

  return (
    <Container $isEnabled={isEnabled} onClick={() => onClick()}>
      {user?.isAdmin && (
        <Icon
          src={threeDots}
          alt="Menu de opções"
          onClick={(e) => toggleMenu(e)}
        />
      )}
      <Img src={imageUrl} alt="Imagem do Módulo" />
      <Content>
        <h5>{moduleName}</h5>
        {path !== "/classes" && <h6>{description}</h6>}
      </Content>
      {showMenu && (
        <MenuDrop
          type={type}
          isEnabled={isEnabled}
          enableOrDisableOne={() => enableOrDisableOne()}
          deleteOne={() => deleteOne()}
        />
      )}
    </Container>
  );
}

const Container = styled.div<{ $isEnabled: boolean }>`
  display: flex;
  width: 100%;
  /* max-width: 57.875rem; */
  height: 11.3rem;
  border-radius: 0.875rem;
  background: var(--white);
  box-shadow: 0px 22.898px 45.796px -11.449px rgba(52, 41, 39, 0.08);
  margin-bottom: 2rem;
  cursor: pointer;
  position: relative;
  /* filter: ${(props) => (props.$isEnabled ? "none" : "grayscale(0.95)")}; */
  mix-blend-mode: ${(props) => (props.$isEnabled ? "normal" : "luminosity")};

  &:hover {
    filter: brightness(0.97);
  }
`;

const Img = styled.img`
  width: 21.0625rem;
  height: 100%;
  object-fit: cover;
  object-position: 50%;
  border-radius: 0.875rem 0 0 0.875rem;
`;

const Content = styled.div`
  width: calc(100% - 21.0625rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2.5rem;

  h5 {
    color: var(--black);
    font-family: Dela Gothic One;
    font-size: 2rem;
    font-style: normal;
    font-weight: 400;
    text-align: center;
    /* margin-bottom: 1.25rem; */
  }

  h6 {
    color: var(--gray-dark);
    font-family: Montserrat;
    font-size: 1rem;
    font-style: normal;
    font-weight: 500;
    text-align: left;
    margin-top: 1.25rem;
    align-self: flex-start;
  }
`;

const Icon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
`;
