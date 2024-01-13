/* eslint-disable react/jsx-no-bind */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import styled from "styled-components";
import { FormEvent, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import PageContainer from "../layouts/PageContainer";
import Button from "../components/Button";
import {
  FileBox,
  FileButton,
  FileInput,
  Flex,
  InfoIcon,
  Input,
  Label,
} from "../layouts/GeneralForm";
import * as classService from "../services/classService";
import { IUserContext, useUserContext } from "../contexts/UserContext";
import checkUserAccess from "../hooks/useCheckUserAccess";
import InfoBox from "../components/InfoBox";

import cloudUpload from "../assets/images/cloud-upload.svg";
import fileIcon from "../assets/images/file-icon.svg";
import garbageIcon from "../assets/images/garbage-icon.svg";
import infoIcon from "../assets/images/info-icon.svg";
import { IClasses } from "./NewModule";

export default function NewClass() {
  const defaultClass = {
    name: "",
    imageUrl: "",
    videoUrl: "",
    summaryUrl: "",
    dueDate: "",
    exerciseFile: "",
  };

  const [_class, setClass] = useState<IClasses>({ ...defaultClass });
  const [toggleInfoBox, setToggleInfoBox] = useState<boolean>(false);
  const [exerciseFile, setExerciseFile] = useState<File>();
  const navigate = useNavigate();
  const params = useParams<{ moduleId: string }>();
  const {
    state: { moduleName },
  } = useLocation();
  const { user } = useUserContext() as IUserContext;

  useEffect(() => {
    checkUserAccess(user, navigate);
  }, []);

  function selectFile() {
    document.getElementById(`exercise-file`)?.click();
  }

  function onChangeFile(e: any) {
    setExerciseFile(e.target.files[0]);
    setClass({ ..._class, exerciseFile: e.target.value });
  }

  function cleanUpFile() {
    setExerciseFile(undefined);
    setClass({ ..._class, exerciseFile: "" });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const body = {
      name: _class.name,
      imageUrl: _class.imageUrl,
      videoUrl: _class.videoUrl,
      summaryUrl: _class.summaryUrl,
      dueDate: _class.dueDate,
      moduleId: params.moduleId as string,
    };

    try {
      await classService.create(user?.token as string, body);

      setClass({ ...defaultClass });
      navigate(`/modules/${params.moduleId}/classes`, {
        state: { moduleName },
      });
    } catch (error) {
      alert(error);
    }
  }

  return (
    <PageContainer $h="100%" $display="flex" $justContent="center">
      <Content onSubmit={(e) => handleSubmit(e)}>
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
        <h4>Cadastrar aula</h4>

        <Label>Nome</Label>
        <Input
          type="text"
          placeholder="Ex: Tipos de dados"
          value={_class.name}
          onChange={(e) => setClass({ ..._class, name: e.target.value })}
          required
        />

        <Label>Link da imagem de capa</Label>
        <Input
          type="url"
          placeholder="Ex: https://www.image.png"
          value={_class.imageUrl}
          onChange={(e) => setClass({ ..._class, imageUrl: e.target.value })}
          required
        />

        <Label>Link do vídeo</Label>
        <Input
          type="url"
          placeholder="Ex: http://www.youtube.com.br/hausjaksua"
          value={_class.videoUrl}
          onChange={(e) => setClass({ ..._class, videoUrl: e.target.value })}
          required
        />

        <Label>Link do resumo</Label>
        <Input
          type="url"
          placeholder="Ex: http://www.notion.com.br/hausjaksua"
          value={_class.summaryUrl}
          onChange={(e) => setClass({ ..._class, summaryUrl: e.target.value })}
          required
        />

        <Flex
          $justifyContent="flex-start"
          $m="0 0 0.75rem 0"
          $position="relative"
        >
          <Label $mb="0">Arquivo dos exercícios</Label>
          <InfoIcon
            style={{ backgroundImage: `url(${infoIcon})` }}
            onClick={() => setToggleInfoBox(!toggleInfoBox)}
          />
          {toggleInfoBox && (
            <InfoBox onClick={() => setToggleInfoBox(!toggleInfoBox)} />
          )}
        </Flex>
        <FileInput>
          <img src={cloudUpload} alt="Cloud icon" />
          <h6>Arraste e solte aqui</h6>
        </FileInput>
        <input
          id="exercise-file"
          type="file"
          accept=".json"
          value={_class.exerciseFile}
          onChange={(e) => onChangeFile(e)}
          hidden
          required
        />
        <Flex $w={26.25} $justifyContent="flex-end">
          <FileButton onClick={() => selectFile()}>
            Selecionar arquivo
          </FileButton>
        </Flex>
        {exerciseFile && (
          <FileBox>
            <img src={fileIcon} alt="File icon" />
            <h6>
              {exerciseFile?.name} ({exerciseFile?.size}b)
            </h6>
            <img
              src={garbageIcon}
              alt="Garbage icon"
              onClick={() => cleanUpFile()}
            />
          </FileBox>
        )}

        <Label>Prazo de entrega</Label>
        <Input
          $w={23}
          $mb={2}
          type="date"
          value={_class.dueDate}
          onChange={(e) => setClass({ ..._class, dueDate: e.target.value })}
          required
        />

        <Flex $w={31.25} $flexDirection="column" $justifyContent="flex-start">
          <Button
            $w={7.5}
            $h={2.75}
            $bgColor="#009FE0"
            $textColor="#FFF"
            text="Cadastrar"
            $margin="0"
            type="submit"
          />
        </Flex>
      </Content>
    </PageContainer>
  );
}

const Content = styled.form`
  width: 64.31vw;
  /* max-width: 57.6875rem; */
  max-width: 31.25rem;
  padding-top: 3rem;

  & > h4 {
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
  justify-content: flex-start;
`;