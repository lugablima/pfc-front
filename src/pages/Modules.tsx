import styled from "styled-components";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PageContainer from "../layouts/PageContainer";
import Card from "../components/Card";
import Button from "../components/Button";
import { IUserContext, useUserContext } from "../contexts/UserContext";
import checkUserAccess from "../hooks/useCheckUserAccess";
import * as moduleService from "../services/moduleService";

export default function Modules() {
  const [modules, setModules] = useState<moduleService.IModule[]>([]);
  const [update, setUpdate] = useState<boolean>(false);
  const { user } = useUserContext() as IUserContext;
  const navigate = useNavigate();

  function updateModules() {
    setUpdate(!update);
  }

  useEffect(() => {
    checkUserAccess(user, navigate);

    async function fetchData(token: string) {
      try {
        const res = await moduleService.getAll(token);

        setModules(res);
      } catch (error) {
        alert(error);
      }
    }

    if (user?.token) {
      fetchData(user.token);
    }
  }, [update]);

  function renderModules() {
    return modules.map((m) => {
      if (!user?.isAdmin && !m.isEnabled) return null;

      return (
        <Card
          key={m.id}
          id={m.id}
          moduleName={m.name}
          description={m.description}
          imageUrl={m.imageUrl}
          isEnabled={m.isEnabled}
          onClick={() =>
            navigate(`/modules/${m.id}/classes`, {
              state: { moduleName: m.name },
            })
          }
          updateEntity={() => updateModules()}
        />
      );
    });
  }

  return (
    <PageContainer $display="flex" $justContent="center">
      <Content $isAdmin={user?.isAdmin}>
        {user?.isAdmin && (
          <Header>
            <Button
              $w={9.375}
              $h={2.75}
              $bgColor="#009FE0"
              $textColor="#F6F5F4"
              text="Novo módulo"
              $margin="0 0 3rem 0"
              onClick={() => navigate("/new-module")}
            />
          </Header>
        )}
        <h5>Módulos</h5>
        {modules.length > 0 && renderModules()}
      </Content>
    </PageContainer>
  );
}

const Content = styled.div<{ $isAdmin: boolean | undefined }>`
  width: 64.31vw;
  max-width: 57.875rem;
  padding-top: ${(props) => (props.$isAdmin ? "3rem" : "8.75rem")};

  & > h5 {
    color: var(--black);
    text-align: center;
    font-family: Montserrat;
    font-size: 3rem;
    font-style: normal;
    font-weight: 700;
    margin-bottom: 3rem;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
`;
