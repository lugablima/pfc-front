import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PageContainer from "../layouts/PageContainer";
import Button from "../components/Button";
import TableHeader from "../components/TableHeader";
import TableRow from "../components/TableRow";
import * as dashboardService from "../services/dashboardService";
import { IUserContext, useUserContext } from "../contexts/UserContext";
import checkUserAccess from "../hooks/useCheckUserAccess";
import { ILoaderContext, useLoaderContext } from "../contexts/LoaderContext";

export default function DashboardForStudent() {
  const { user } = useUserContext() as IUserContext;
  const { showLoader, hideLoader } = useLoaderContext() as ILoaderContext;
  const params = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] =
    useState<dashboardService.IGetDashboardDataForUser | null>(null);

  useEffect(() => {
    const fetchDashboardDataForUser = async (token: string, userId: string) => {
      try {
        showLoader();
        const res = await dashboardService.getDashboardDataForUser(
          token,
          userId,
        );

        setDashboardData(res);
      } catch (error) {
        alert(error);
      } finally {
        hideLoader();
      }
    };

    checkUserAccess(user, navigate);

    if (!user?.token) return;

    fetchDashboardDataForUser(user.token, params?.userId as string);
  }, []);

  const RenderTableRows = () => {
    return dashboardData?.exercises.map((ex) => {
      const exerciseName = `${ex.name} (M${ex.class.module.sequence}/A${ex.class.sequence}/E${ex.sequence})`;

      return (
        <TableRow
          key={ex.id}
          isStudentDashboard
          userNameOrExerciseName={exerciseName}
          exerciseStatus={ex.resolutions.length > 0}
          porcentage={
            ex.resolutions.length
              ? Number(ex.resolutions[0].grade.toFixed(2))
              : 0
          }
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
        <h4>
          Visão geral das entregas de {dashboardData ? dashboardData?.name : ""}
        </h4>
        <TableHeader isStudentDashboard />
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
