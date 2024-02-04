/* eslint-disable react/jsx-no-bind */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-array-index-key */
import styled from "styled-components";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import PageContainer from "../layouts/PageContainer";
import Button from "../components/Button";
import { Flex, Input, Label, PlusButton } from "../layouts/GeneralForm";
import SubClass from "../components/SubClass";
import * as moduleService from "../services/moduleService";
import { IUserContext, useUserContext } from "../contexts/UserContext";
import checkUserAccess from "../hooks/useCheckUserAccess";
import { ILoaderContext, useLoaderContext } from "../contexts/LoaderContext";

type TModule = Omit<moduleService.IModule, "id" | "createdAt" | "isEnabled">;

export interface IClasses {
  name: string;
  imageUrl: string;
  videoUrl: string;
  summaryUrl: string;
  exerciseFile: {
    name: string;
    size: number;
    value: string;
    content: string;
  };
  dueDate: string;
}

export default function NewModule() {
  const defaultModule = {
    name: "",
    description: "",
    imageUrl: "",
  };

  const defaultClass = {
    name: "",
    imageUrl: "",
    videoUrl: "",
    summaryUrl: "",
    dueDate: "",
    exerciseFile: {
      name: "",
      size: 0,
      value: "",
      content: "",
    },
  };
  const [module, setModule] = useState<TModule>({ ...defaultModule });
  const [classes, setClasses] = useState<IClasses[]>([
    { ...defaultClass, exerciseFile: { ...defaultClass.exerciseFile } },
  ]);
  const navigate = useNavigate();
  const { user } = useUserContext() as IUserContext;
  const { showLoader, hideLoader } = useLoaderContext() as ILoaderContext;

  useEffect(() => {
    checkUserAccess(user, navigate);
  }, []);

  function updateClass(index: number, propName: keyof IClasses, newValue: any) {
    classes[index][propName] = newValue;
    setClasses([...classes]);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const body = {
      ...module,
      classes: classes.map((_class) => ({
        name: _class.name,
        imageUrl: _class.imageUrl,
        videoUrl: _class.videoUrl,
        summaryUrl: _class.summaryUrl,
        dueDate: _class.dueDate,
        exerciseFile: _class.exerciseFile,
      })),
    };

    try {
      showLoader();
      await moduleService.create(user?.token as string, body);

      setModule({ ...defaultModule });
      setClasses([
        { ...defaultClass, exerciseFile: { ...defaultClass.exerciseFile } },
      ]);
      navigate("/modules");
    } catch (error) {
      alert(error);
    } finally {
      hideLoader();
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
            onClick={() => navigate("/modules")}
          />
        </Header>
        <h4>Cadastrar módulo</h4>

        <Label>Nome</Label>
        <Input
          type="text"
          placeholder="Ex: Estrutura de dados"
          value={module.name}
          onChange={(e) => setModule({ ...module, name: e.target.value })}
          required
        />

        <Label>Descrição</Label>
        <Input
          type="text"
          placeholder="Ex: Nesse módulo você irá aprender sobre..."
          value={module.description}
          onChange={(e) =>
            setModule({ ...module, description: e.target.value })
          }
          required
        />

        <Label>Link da imagem de capa</Label>
        <Input
          type="url"
          placeholder="Ex: https://www.image.png"
          value={module.imageUrl}
          onChange={(e) => setModule({ ...module, imageUrl: e.target.value })}
          required
        />

        <Label>Aulas</Label>

        {classes.length &&
          classes.map((_class, index) => (
            <SubClass
              key={index}
              index={index}
              _class={_class}
              updateClass={updateClass}
              isCreating
            />
          ))}

        <Flex $w={31.25} $flexDirection="column" $justifyContent="flex-start">
          <PlusButton
            onClick={() =>
              setClasses([
                ...classes,
                {
                  ...defaultClass,
                  exerciseFile: { ...defaultClass.exerciseFile },
                },
              ])
            }
          >
            +
          </PlusButton>
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
