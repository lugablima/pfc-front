import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PageContainer from "../layouts/PageContainer";
import Button from "../components/Button";
import { Flex } from "../layouts/GeneralForm";
import checkUserAccess from "../hooks/useCheckUserAccess";
import { IUserContext, useUserContext } from "../contexts/UserContext";
import * as videoService from "../services/videoService";
import { ILoaderContext, useLoaderContext } from "../contexts/LoaderContext";

export default function Video() {
  const navigate = useNavigate();
  const params = useParams<{ moduleId: string; classId: string }>();
  const { user } = useUserContext() as IUserContext;
  const [videoInfos, setVideoInfos] = useState<videoService.IVideoOrSummary>();
  const { showLoader, hideLoader } = useLoaderContext() as ILoaderContext;

  useEffect(() => {
    checkUserAccess(user, navigate);

    async function fetchData(token: string) {
      try {
        if (!params.classId) return;

        showLoader();
        const res = await videoService.getOne(token, params.classId);

        setVideoInfos(res);
      } catch (error) {
        alert(error);
      }
    }

    if (user?.token) {
      fetchData(user.token);
    }
  }, []);

  return (
    <PageContainer $display="flex" $justContent="center">
      <Content>
        <Button
          $w={5.75}
          $h={2.75}
          $bgColor="#009FE0"
          $textColor="#FFF"
          $borderRadius={6.25}
          text="Voltar"
          $margin="0 0 3rem 0"
          onClick={() => navigate(`/modules/${params.moduleId}/classes`)}
        />

        <h5>{videoInfos && videoInfos.class.name}</h5>

        <VideoContainer
          src={`https://www.youtube.com/embed/${videoInfos?.url.split(
            "https://youtu.be/",
          )[1]}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          onLoad={() => hideLoader()}
        />

        <Flex $justifyContent="space-between" $m="0">
          <Button
            $w={12.1875}
            $h={2.75}
            $bgColor="#009FE0"
            $textColor="#FFF"
            $borderRadius={6.25}
            text="Ver resumo da aula"
            onClick={() =>
              navigate(
                `/modules/${params.moduleId}/classes/${params.classId}/summary`,
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
    margin-bottom: 4.5rem;
  }
`;

const VideoContainer = styled.iframe`
  width: 100%;
  height: 30.25rem;
  margin-bottom: 3rem;
`;
