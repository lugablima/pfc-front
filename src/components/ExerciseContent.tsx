/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ExerciseStatement from "./ExerciseStatement";
import CodeEditor from "./CodeEditor";
import Terminal from "./Terminal";
import { IExercises } from "../contexts/ExercisesContext";
import { Flex } from "../layouts/GeneralForm";
import Button from "./Button";
import { generateCTests } from "../utils/generateTests";
import toCamelCase from "../utils/toCamelCase";
import generateGradeForTesting from "../utils/generateGradeForTests";
import { IUserContext, useUserContext } from "../contexts/UserContext";
import ExerciseStatus from "./ExerciseStatus";
import { IModalContext, useModalContext } from "../contexts/ModalContext";

interface IExerciseContenProps {
  exercise: IExercises;
}

const cDefault = `// some comment`;

const cLanguageProps = {
  id: 50,
  name: "C (GCC 9.2.0)",
};

// const tests = [
//   {
//     inputDataType: "int array",
//     inputs: [1, 2, 3, 4],
//     resultDataType: "int",
//     result: 4,
//   },
//   {
//     inputDataType: "int array",
//     inputs: [5, 6, 7, 8],
//     resultDataType: "int",
//     result: 8,
//   },
//   {
//     inputDataType: "int array",
//     inputs: [9, 10, 11, 12],
//     resultDataType: "int",
//     result: 12,
//   },
// ];

// const tests = [
//   {
//     inputDataType: "double",
//     inputs: 2.2,
//     resultDataType: "char",
//     result: "a",
//   },
//   {
//     inputDataType: "double",
//     inputs: 5.1,
//     resultDataType: "char",
//     result: "b",
//   },
//   {
//     inputDataType: "double",
//     inputs: 10.1,
//     resultDataType: "char",
//     result: "b",
//   },
// ];

export default function ExerciseContent({ exercise }: IExerciseContenProps) {
  const { user } = useUserContext() as IUserContext;
  const { handleOpenModal } = useModalContext() as IModalContext;
  const params = useParams<{ classId: string }>();

  const [code, setCode] = useState(
    exercise.resolutions.length
      ? JSON.parse(exercise.resolutions[0].resolution)
      : cDefault,
  );
  const [outputDetails, setOutputDetails] = useState<string | null>(null);
  const [processing, setProcessing] = useState<boolean | null>(null);
  const [grade, setGrade] = useState<number | null>(null);

  useEffect(() => {
    const initExerciseInfos = () => {
      if (exercise.resolutions.length) {
        setGrade(exercise.resolutions[0].grade);
      }
    };

    initExerciseInfos();
  }, []);

  const onChange = (action: string, data: string) => {
    switch (action) {
      case "code": {
        setCode(data);
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };

  const checkStatus = async (token: string) => {
    const options = {
      method: "GET",
      url: `${import.meta.env.VITE_API_RAPID_API_URL}/${token}`,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": import.meta.env.VITE_API_RAPID_API_HOST,
        "X-RapidAPI-Key": import.meta.env.VITE_API_RAPID_API_KEY,
      },
    };

    try {
      const response = await axios.request(options);
      const statusId = response.data.status?.id;

      // Processed - we have a result
      if (statusId === 1 || statusId === 2) {
        // still processing
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
      } else {
        setProcessing(false);
        setOutputDetails(response.data);
        const gradeGenerated = generateGradeForTesting(
          response.data,
          exercise.tests,
        );
        setGrade(gradeGenerated);
        handleOpenModal({
          token: user?.token as string,
          exerciseId: exercise.id,
          classId: params?.classId as string,
          resolution: {
            grade: gradeGenerated,
            resolution: JSON.stringify(code),
          },
        });
        // showSuccessToast(`Compiled Successfully!`)
      }
    } catch (err) {
      console.log("err", err);
      setProcessing(false);
      // showErrorToast();
    }
  };

  const handleCompile = () => {
    setProcessing(true);

    const newCode = generateCTests(
      code,
      exercise.tests,
      toCamelCase(exercise.name),
    );

    const formData = {
      language_id: cLanguageProps.id,
      // encode source code in base64
      source_code: btoa(newCode),
      // stdin: btoa(customInput),
    };

    const options = {
      method: "POST",
      url: import.meta.env.VITE_API_RAPID_API_URL,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Host": import.meta.env.VITE_API_RAPID_API_HOST,
        "X-RapidAPI-Key": import.meta.env.VITE_API_RAPID_API_KEY,
      },
      data: formData,
    };

    axios
      .request(options)
      .then((response) => {
        const { token } = response.data;
        checkStatus(token);
      })
      .catch((err) => {
        const error = err.response ? err.response.data : err;
        setProcessing(false);
        console.log(error);
      });
  };

  return (
    <Content>
      <ExerciseStatement
        name={exercise.name}
        sequence={exercise.sequence}
        statement={exercise.statement}
      />
      <RightSide>
        <CodeEditor code={code} onChange={onChange} />
        <Terminal outputDetails={outputDetails} />
        <Flex
          $justifyContent={grade !== null ? "space-between" : "flex-end"}
          $m="1rem 0 0 0"
        >
          {grade !== null && (
            <ExerciseStatus grade={grade} resolutions={exercise.resolutions} />
          )}
          <Button
            $w={10.875}
            $h={2.75}
            $bgColor="#009FE0"
            $textColor="#FFF"
            $borderRadius={6.25}
            text={processing ? "Processando..." : "Checar exercício"}
            $margin="0 1rem 0 0"
            disabled={!code}
            onClick={handleCompile}
          />
        </Flex>
      </RightSide>
    </Content>
  );
}

const Content = styled.div`
  display: flex;
  column-gap: 1rem;
  padding: 0 1rem;
`;

const RightSide = styled.div`
  /* width: 58.59%; */
  /* max-width: 100%; */
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;
