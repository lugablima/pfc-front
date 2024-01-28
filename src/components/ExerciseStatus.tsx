import styled from "styled-components";
import { IResolution } from "../contexts/ExercisesContext";

interface IExerciseStatusProps {
  grade: number;
  resolutions: IResolution[];
}

export default function ExerciseStatus({
  grade,
  resolutions,
}: IExerciseStatusProps) {
  return (
    <Container $status={!!resolutions.length}>
      <p>
        Status: <span>{resolutions.length ? "Enviado" : "Não enviado"}</span>
      </p>
      <p>Passou em {grade}% dos testes</p>
    </Container>
  );
}

const Container = styled.div<{ $status: boolean }>`
  & > p {
    color: var(--black);
    font-family: Montserrat;
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 500;
    line-height: 100%; /* 1.5rem */
    letter-spacing: -0.06rem;
    text-align: left;
  }

  span {
    color: ${(props) => (props.$status ? "#009FE0" : "#f00")};
  }

  & > p:first-child {
    margin-bottom: 0.5rem;
  }
`;
