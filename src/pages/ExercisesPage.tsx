/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/no-unstable-nested-components */
import styled from "styled-components";
import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import PageContainer from "../layouts/PageContainer";
import Button from "../components/Button";
import Tabs from "../components/Tabs";
import ExerciseContent from "../components/ExerciseContent";
import { IUserContext, useUserContext } from "../contexts/UserContext";
import checkUserAccess from "../hooks/useCheckUserAccess";
import {
  IExercisesContext,
  useExercisesContext,
} from "../contexts/ExercisesContext";
import { ILoaderContext, useLoaderContext } from "../contexts/LoaderContext";

export default function ExercisesPage() {
  const { user } = useUserContext() as IUserContext;
  const { showLoader, hideLoader } = useLoaderContext() as ILoaderContext;
  const { exercises, fetchExercises } =
    useExercisesContext() as IExercisesContext;
  const params = useParams<{ moduleId: string; classId: string }>();
  const navigate = useNavigate();

  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    checkUserAccess(user, navigate);

    if (user?.token && params.classId) {
      showLoader();
      fetchExercises(user.token, params.classId).then(() => hideLoader());
    }
  }, []);

  const onChangeTab = (newSelectedTab: number) => {
    setSelectedTab(newSelectedTab);
  };

  // const handleOpenModal = () => {
  //   setIsModalOpen(true);
  // };

  // const handleCloseModal = () => {
  //   setIsModalOpen(false);
  // };

  // const handleSendClick = () => {
  //   // Lógica a ser executada quando o usuário clica em "OK"
  //   console.log("OK clicado");
  //   handleCloseModal();
  // };

  // const handleCancelClick = () => {
  //   // Lógica a ser executada quando o usuário clica em "Cancelar"
  //   console.log("Cancelar clicado");
  //   handleCloseModal();
  // };

  function RenderExercisesContent() {
    return (
      <>
        {exercises &&
          exercises.length &&
          exercises.map((ex, idx) => {
            if (idx === selectedTab) {
              return <ExerciseContent key={ex.id} exercise={ex} />;
            }

            return null;
          })}
      </>
    );
  }

  return (
    <PageContainer $h="100%">
      <Header>
        <Button
          $w={11.25}
          $h={2.75}
          $bgColor="#009FE0"
          $textColor="#FFF"
          $borderRadius={6.25}
          text="Voltar para a aula"
          onClick={() =>
            navigate(
              `/modules/${params.moduleId}/classes/${params.classId}/video`,
            )
          }
        />
        <Tabs selectedTab={selectedTab} onChangeTab={onChangeTab} />
        <Button
          $w={11.5}
          $h={2.75}
          $bgColor="#009FE0"
          $textColor="#FFF"
          $borderRadius={6.25}
          text="Próximo exercício"
          onClick={() =>
            exercises &&
            selectedTab < exercises.length - 1 &&
            setSelectedTab(selectedTab + 1)
          }
          disabled={exercises ? selectedTab === exercises.length - 1 : false}
        />
      </Header>
      {RenderExercisesContent()}
    </PageContainer>
  );
}

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 3rem 0 3.06rem;
  padding: 0 1rem;
`;
