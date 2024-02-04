import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PageContainer from "../layouts/PageContainer";
import Button from "../components/Button";
import TableHeader from "../components/TableHeader";
import TableRow from "../components/TableRow";
import * as dashboardService from "../services/dashboardService";
import { IUserContext, useUserContext } from "../contexts/UserContext";
import checkUserAccess from "../hooks/useCheckUserAccess";
import { ILoaderContext, useLoaderContext } from "../contexts/LoaderContext";

export default function Dashboard() {
  const { user } = useUserContext() as IUserContext;
  const { showLoader, hideLoader } = useLoaderContext() as ILoaderContext;
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] =
    useState<dashboardService.IGetDashboardData | null>(null);

  useEffect(() => {
    const fetchDashboardData = async (token: string) => {
      try {
        showLoader();
        const res = await dashboardService.getDashboardData(token);

        setDashboardData(res);
      } catch (error) {
        alert(error);
      } finally {
        hideLoader();
      }
    };

    checkUserAccess(user, navigate);

    if (!user?.token) return;

    fetchDashboardData(user.token);
  }, []);

  const RenderTableRows = () => {
    return dashboardData?.users.map((userData) => {
      const porcentage =
        dashboardData.exercisesCount === 0
          ? 0
          : (userData.resolutionsCount / dashboardData.exercisesCount) * 100;

      return (
        <TableRow
          key={userData.id}
          isStudentDashboard={false}
          userNameOrExerciseName={userData.name}
          porcentage={Number(porcentage.toFixed(2))}
          onClick={() => navigate(`/dashboard/${userData.id}`)}
        />
      );
    });
  };

  return (
    <PageContainer $h="100%" $display="flex" $justContent="center">
      <Content>
        <Header>
          <Button
            $w={5.75}
            $h={2.75}
            $bgColor="#009FE0"
            $textColor="#FFF"
            text="Voltar"
            $margin="0 0 3rem 0"
            onClick={() => navigate(-1)}
          />
        </Header>
        <h4>Visão geral das entregas dos alunos</h4>
        <TableHeader isStudentDashboard={false} />
        {dashboardData && RenderTableRows()}
      </Content>
    </PageContainer>
  );
}

const Content = styled.div`
  width: 64.31vw;
  /* max-width: 57.6875rem; */
  max-width: 57.875rem;
  padding-top: 3rem;

  & > h4 {
    color: var(--black);
    text-align: center;
    font-family: Montserrat;
    font-size: 1.125rem;
    font-style: normal;
    font-weight: 600;
    margin-bottom: 3rem;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-start;
`;
