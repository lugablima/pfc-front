/* eslint-disable jsx-a11y/anchor-is-valid */
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PageContainer from "../layouts/PageContainer";
import Button from "../components/Button";
import { Flex } from "../layouts/GeneralForm";
import { IUserContext, useUserContext } from "../contexts/UserContext";
import * as summaryService from "../services/summaryService";
import { IVideoOrSummary } from "../services/videoService";
import checkUserAccess from "../hooks/useCheckUserAccess";
import { ILoaderContext, useLoaderContext } from "../contexts/LoaderContext";

export default function Summary() {
  const navigate = useNavigate();
  const params = useParams<{ moduleId: string; classId: string }>();
  const { user } = useUserContext() as IUserContext;
  const [summaryInfos, setSummaryInfos] = useState<IVideoOrSummary>();
  const { showLoader, hideLoader } = useLoaderContext() as ILoaderContext;

  useEffect(() => {
    checkUserAccess(user, navigate);

    async function fetchData(token: string) {
      try {
        if (!params.classId) return;

        showLoader();
        const res = await summaryService.getOne(token, params.classId);

        setSummaryInfos(res);
      } catch (error) {
        alert(error);
      } finally {
        hideLoader();
      }
    }

    if (user?.token) {
      fetchData(user.token);
    }
  }, []);

  return (
    <PageContainer $h="100%" $display="flex" $justContent="center">
      <Content>
        <Flex $justifyContent="space-between">
          <Button
            $w={5.75}
            $h={2.75}
            $bgColor="#009FE0"
            $textColor="#FFF"
            $borderRadius={6.25}
            text="Voltar"
            onClick={() =>
              navigate(
                `/modules/${params.moduleId}/classes/${params.classId}/video`,
              )
            }
          />
          <Button
            $w={12.3125}
            $h={2.75}
            $bgColor="#009FE0"
            $textColor="#FFF"
            $borderRadius={6.25}
            text="Ir para os exercícios"
            onClick={() =>
              navigate(
                `/modules/${params.moduleId}/classes/${params.classId}/exercises`,
              )
            }
          />
        </Flex>

        {summaryInfos && (
          <SummaryContainer>
            <a href={summaryInfos.url} target="_blank" rel="noreferrer">
              {summaryInfos.url}
            </a>
          </SummaryContainer>
        )}
      </Content>
    </PageContainer>
  );
}

const Content = styled.div`
  width: 64.31vw;
  max-width: 57.875rem;
  padding-top: 3rem;
`;

const SummaryContainer = styled.div`
  width: 100%;
  height: 43rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;
  text-align: center;
`;
