/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import unespLogo from "../assets/images/unesp-logo.png";
import Button from "./Button";
import { IUserContext, useUserContext } from "../contexts/UserContext";

export default function Header() {
  const navigate = useNavigate();
  const path = useLocation().pathname;
  const { user, setUser } = useUserContext() as IUserContext;

  function logOut() {
    setUser(null);
    navigate("/");
  }

  function navigateToModules() {
    if (path !== "/" && path !== "/sign-up") {
      navigate("/modules");
    }
  }

  return (
    <Container className="header">
      <img
        src={unespLogo}
        alt="Logo da Unesp"
        onClick={() => navigateToModules()}
      />
      <ButtonsBox>
        {user?.isAdmin &&
          path !== "/" &&
          path !== "/sign-up" &&
          path !== "/dashboard" && (
            <Button
              $w={8.1875}
              $h={2.75}
              $bgColor="#F6F5F4"
              $textColor="#009FE0"
              text="Dashboard"
              onClick={() => navigate("/dashboard")}
            />
          )}
        {path !== "/" && path !== "/sign-up" && (
          <Button
            $w={4.625}
            $h={2.75}
            $bgColor="#F6F5F4"
            $textColor="#009FE0"
            text="Sair"
            onClick={() => logOut()}
          />
        )}
      </ButtonsBox>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 4rem;
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--primary);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  position: fixed;
  z-index: 1;

  img {
    width: 9.20931rem;
    height: 3rem;
    cursor: pointer;
  }
`;

const ButtonsBox = styled.div`
  display: flex;
  justify-content: space-between;
  column-gap: 0.75rem;
`;
