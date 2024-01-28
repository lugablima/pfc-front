import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import YouTube from "react-youtube";
import PageContainer from "../layouts/PageContainer";
import Button from "../components/Button";
import { Flex } from "../layouts/GeneralForm";
import checkUserAccess from "../hooks/useCheckUserAccess";
import { IUserContext, useUserContext } from "../contexts/UserContext";
import * as videoService from "../services/videoService";

export default function Video() {
  const navigate = useNavigate();
  const params = useParams<{ moduleId: string; classId: string }>();
  const { user } = useUserContext() as IUserContext;
  const [videoInfos, setVideoInfos] = useState<videoService.IVideoOrSummary>();

  useEffect(() => {
    checkUserAccess(user, navigate);

    async function fetchData(token: string) {
      try {
        if (!params.classId) return;

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

  const opts = {
    height: "484",
    width: "100%",
    playerVars: {
      // Adicione parâmetros do player aqui, se necessário (consulte a documentação do YouTube API)
    },
  };

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

        <YouTube videoId={videoInfos?.url.split("?v=")[1]} opts={opts} />

        <Flex $justifyContent="space-between" $m="3rem 0 0 0">
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

// const VideoContainer = styled.div`
//   height: 30.25rem;
//   background-color: black;
//   margin-bottom: 3rem;
// `;
