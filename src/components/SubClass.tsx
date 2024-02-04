/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import {
  FileBox,
  FileButton,
  Flex,
  InfoIcon,
  Input,
  Separator,
  SubLabel,
} from "../layouts/GeneralForm";
import InfoBox from "./InfoBox";
// import cloudUpload from "../assets/images/cloud-upload.svg";
import fileIcon from "../assets/images/file-icon.svg";
import garbageIcon from "../assets/images/garbage-icon.svg";
import infoIcon from "../assets/images/info-icon.svg";
import { IClasses } from "../pages/NewModule";
import validateJSONStructure from "../utils/validateJsonFile";

interface ISubClass {
  index: number;
  _class: IClasses;
  updateClass(index: number, propName: keyof IClasses, newValue: any): void;
  isCreating: boolean;
}

export default function SubClass({
  index,
  _class,
  updateClass,
  isCreating,
}: ISubClass) {
  const [toggleInfoBox, setToggleInfoBox] = useState<boolean>(false);

  const defaultExerciseFile = {
    name: "",
    size: "",
    value: "",
    content: "",
  };

  function selectFile() {
    document.getElementById(`exercise-file-${index}`)?.click();
  }

  function onChangeFile(e: any) {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target?.result as string);

          if (!validateJSONStructure(data)) {
            alert(
              "A estrutura do JSON está inválida, por favor, faça o upload de um novo arquivo!",
            );
            return;
          }

          updateClass(index, "exerciseFile", {
            name: file.name,
            size: file.size,
            value: file.name,
            content: JSON.stringify(data),
          });
        } catch (error) {
          console.error("Erro ao analisar o arquivo JSON:", error);
        }
      };

      reader.readAsText(file);
    }
  }

  function cleanUpFile() {
    updateClass(index, "exerciseFile", { ...defaultExerciseFile });
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
        required={isCreating}
      />

      <SubLabel>Link da imagem de capa</SubLabel>
      <Input
        $w={23}
        $mb={0.5}
        type="url"
        placeholder="Ex: https://www.image.png"
        value={_class.imageUrl}
        onChange={(e) => updateClass(index, "imageUrl", e.target.value)}
        required={isCreating}
      />

      <SubLabel>Link do vídeo</SubLabel>
      <Input
        $w={23}
        $mb={0.5}
        type="url"
        placeholder="Ex: http://www.youtube.com.br/hausjaksua"
        value={_class.videoUrl}
        onChange={(e) => updateClass(index, "videoUrl", e.target.value)}
        required={isCreating}
      />

      <SubLabel>Link do resumo</SubLabel>
      <Input
        $w={23}
        $mb={0.5}
        type="url"
        placeholder="Ex: http://www.notion.com.br/hausjaksua"
        value={_class.summaryUrl}
        onChange={(e) => updateClass(index, "summaryUrl", e.target.value)}
        required={isCreating}
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
      {/* <FileInput>
        <img src={cloudUpload} alt="Cloud icon" />
        <h6>Arraste e solte aqui</h6>
      </FileInput> */}
      <input
        id={`exercise-file-${index}`}
        type="file"
        accept=".json"
        onChange={(e) => onChangeFile(e)}
        hidden
        readOnly
        required={isCreating}
      />
      <Flex $w={26.25} $justifyContent="center">
        <FileButton onClick={() => selectFile()} type="button">
          Selecionar arquivo
        </FileButton>
      </Flex>
      {_class.exerciseFile.name && (
        <FileBox>
          <img src={fileIcon} alt="File icon" />
          <h6>
            {_class.exerciseFile.name} ({_class.exerciseFile.size}b)
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
        required={isCreating}
      />

      <Separator />
    </>
  );
}
