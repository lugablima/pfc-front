import styled from "styled-components";

interface ITableHeaderProps {
  isStudentDashboard: boolean;
}

export default function TableHeader({ isStudentDashboard }: ITableHeaderProps) {
  return (
    <Container>
      <h6>{isStudentDashboard ? "Exercício" : "Aluno"}</h6>
      {isStudentDashboard && <h6>Status</h6>}
      <h6>
        {isStudentDashboard
          ? "Porcentagem de acerto"
          : "Porcentagem de entregas"}
      </h6>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.82rem;

  & > h6 {
    color: var(--black);
    font-family: Montserrat;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 600;
    line-height: 1rem; /* 133.333% */
  }
`;
