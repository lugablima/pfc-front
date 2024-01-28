import styled from "styled-components";

interface IExerciseStatementProps {
  name: string;
  sequence: number;
  statement: string;
}

export default function ExerciseStatement({
  name,
  sequence,
  statement,
}: IExerciseStatementProps) {
  return (
    <Container>
      <h5>
        Exercício {sequence} • {name}
      </h5>
      <h6>{statement}</h6>
    </Container>
  );
}

const Container = styled.div`
  width: 41.41%;
  max-width: 36.3125rem;
  min-width: 30rem;
  height: 45.75rem;
  padding: 1rem;
  overflow-y: auto;

  border-radius: 0.25rem;
  background: #eee;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

  h5 {
    color: var(--black);
    font-family: Montserrat;
    font-size: 2rem;
    font-style: normal;
    font-weight: 600;
    letter-spacing: -0.08rem;
    text-align: left;
    margin-bottom: 0.75rem;
  }

  h6 {
    color: var(--black);
    font-family: Montserrat;
    font-size: 2rem;
    font-style: normal;
    font-weight: 400;
    letter-spacing: -0.08rem;
  }
`;
