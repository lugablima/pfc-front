/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import {
  FileBox,
  FileButton,
  FileInput,
  Flex,
  InfoIcon,
  Input,
  Separator,
  SubLabel,
} from "../layouts/GeneralForm";
import InfoBox from "./InfoBox";
import cloudUpload from "../assets/images/cloud-upload.svg";
import fileIcon from "../assets/images/file-icon.svg";
import garbageIcon from "../assets/images/garbage-icon.svg";
import infoIcon from "../assets/images/info-icon.svg";
import { IClasses } from "../pages/NewModule";

interface ISubClass {
  index: number;
  _class: IClasses;
  updateClass(index: number, propName: keyof IClasses, newValue: any): void;
}

export default function SubClass({ index, _class, updateClass }: ISubClass) {
  const [toggleInfoBox, setToggleInfoBox] = useState<boolean>(false);
  const [exerciseFile, setExerciseFile] = useState<File>();

  function selectFile() {
    document.getElementById(`exercise-file-${index}`)?.click();
  }

  function onChangeFile(e: any) {
    setExerciseFile(e.target.files[0]);
    updateClass(index, "exerciseFile", e.target.value);
  }

  function cleanUpFile() {
    setExerciseFile(undefined);
    updateClass(index, "exerciseFile", "");
  }

  return (
    <>
      <SubLabel>Nome</SubLabel>
      <Input
        $w={23}
        $mb={0.5}
        type="text"
        placeholder="Ex: Tipos de variáveis"
        value={_class.name}
        onChange={(e) => updateClass(index, "name", e.target.value)}
        required
      />

      <SubLabel>Link da imagem de capa</SubLabel>
      <Input
        $w={23}
        $mb={0.5}
        type="url"
        placeholder="Ex: https://www.image.png"
        value={_class.imageUrl}
        onChange={(e) => updateClass(index, "imageUrl", e.target.value)}
        required
      />

      <SubLabel>Link do vídeo</SubLabel>
      <Input
        $w={23}
        $mb={0.5}
        type="url"
        placeholder="Ex: http://www.youtube.com.br/hausjaksua"
        value={_class.videoUrl}
        onChange={(e) => updateClass(index, "videoUrl", e.target.value)}
        required
      />

      <SubLabel>Link do resumo</SubLabel>
      <Input
        $w={23}
        $mb={0.5}
        type="url"
        placeholder="Ex: http://www.notion.com.br/hausjaksua"
        value={_class.summaryUrl}
        onChange={(e) => updateClass(index, "summaryUrl", e.target.value)}
        required
      />

      <Flex $justifyContent="flex-start" $m="0 0 0.5rem 0" $position="relative">
        <SubLabel $m="0">Arquivo dos exercícios</SubLabel>
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
        id={`exercise-file-${index}`}
        type="file"
        accept=".json"
        value={_class.exerciseFile}
        onChange={(e) => onChangeFile(e)}
        hidden
        required
      />
      <Flex $w={26.25} $justifyContent="flex-end">
        <FileButton onClick={() => selectFile()}>Selecionar arquivo</FileButton>
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

      <SubLabel>Prazo de entrega</SubLabel>
      <Input
        $w={23}
        $mb={0.75}
        type="date"
        value={_class.dueDate}
        onChange={(e) => updateClass(index, "dueDate", e.target.value)}
        required
      />

      <Separator />
    </>
  );
}
