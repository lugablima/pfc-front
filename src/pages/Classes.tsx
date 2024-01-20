import styled from "styled-components";

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PageContainer from "../layouts/PageContainer";
import Card from "../components/Card";
import Button from "../components/Button";
import { IUserContext, useUserContext } from "../contexts/UserContext";
import checkUserAccess from "../hooks/useCheckUserAccess";
import * as classService from "../services/classService";

export default function Classes() {
  const [classes, setClasses] = useState<classService.TGetAllClasses[]>([]);
  const [update, setUpdate] = useState<boolean>(false);
  const { user } = useUserContext() as IUserContext;
  const navigate = useNavigate();
  const params = useParams<{ moduleId: string }>();

  function updateClasses() {
    setUpdate(!update);
  }

  useEffect(() => {
    checkUserAccess(user, navigate);

    async function fetchData(token: string) {
      try {
        if (!params.moduleId) return;

        const res = await classService.getAll(token, params.moduleId);

        setClasses(res);
      } catch (error) {
        alert(error);
      }
    }

    if (user?.token) {
      fetchData(user.token);
    }
  }, [update]);

  function renderClasses() {
    return classes.map((c) => {
      if (!user?.isAdmin && !c.isEnabled) return null;

      return (
        <Card
          key={c.id}
          id={c.id}
          moduleName={c.name}
          imageUrl={c.imageUrl}
          isEnabled={c.isEnabled}
          onClick={() => navigate(`/classes/${c.id}/video`)}
          updateEntity={() => updateClasses()}
        />
      );
    });
  }

  return (
    <PageContainer $display="flex" $justContent="center">
      <Content>
        <Header>
          <Button
            $w={5.75}
            $h={2.75}
            $bgColor="#009FE0"
            $textColor="#F6F5F4"
            text="Voltar"
            $margin="0 0 3rem 0"
            onClick={() => navigate(-1)}
          />
          {user?.isAdmin && (
            <Button
              $w={7.625}
              $h={2.75}
              $bgColor="#009FE0"
              $textColor="#F6F5F4"
              text="Nova aula"
              $margin="0 0 3rem 0"
              onClick={() => navigate(`/modules/${params.moduleId}/new-class`)}
            />
          )}
        </Header>
        <h5>Aulas • {classes.length && classes[0].module.name}</h5>
        {classes.length > 0 && renderClasses()}
      </Content>
    </PageContainer>
  );
}

const Content = styled.div`
  width: 64.31vw;
  max-width: 57.875rem;
  padding-top: 3rem;

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
  justify-content: space-between;
`;
