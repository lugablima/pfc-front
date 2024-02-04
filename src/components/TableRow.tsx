/* eslint-disable react/require-default-props */
import styled from "styled-components";

interface ITableRowProps {
  isStudentDashboard: boolean;
  userNameOrExerciseName: string;
  exerciseStatus?: boolean;
  porcentage: number;
  onClick?: () => void;
}

export default function TableRow({
  isStudentDashboard,
  userNameOrExerciseName,
  exerciseStatus,
  porcentage,
  onClick,
}: ITableRowProps) {
  return (
    <Container onClick={onClick} $isStudentDashboard={isStudentDashboard}>
      <p>{userNameOrExerciseName}</p>
      {isStudentDashboard && (
        <StatusBox $exerciseStatus={exerciseStatus || false}>
          <p>{exerciseStatus ? "Entregue" : "Não Entregue"}</p>
        </StatusBox>
      )}
      <ProgressBarBox>
        <ProgressBar $pct={porcentage}>
          <div />
        </ProgressBar>
        <p>{porcentage}%</p>
      </ProgressBarBox>
    </Container>
  );
}

const Container = styled.div<{ $isStudentDashboard: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3.56rem;
  cursor: ${(props) => (props.$isStudentDashboard ? "auto" : "pointer")};

  & > p {
    color: #808080;
    font-family: Montserrat;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 600;
    line-height: 1rem; /* 133.333% */
  }
`;

const StatusBox = styled.div<{ $exerciseStatus: boolean }>`
  /* width: 3.6875rem; */
  height: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.25rem;
  border-radius: 0.25rem;
  background: ${(props) => (props.$exerciseStatus ? "#DEEDE5" : "#FDF8CE")};

  & > p {
    color: ${(props) => (props.$exerciseStatus ? "#427a5b" : "#938406")};
    font-family: Montserrat;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1rem; /* 133.333% */
  }
`;

const ProgressBarBox = styled.div`
  width: 10.32063rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > p {
    color: #4c4c4c;
    text-align: right;
    font-family: Montserrat;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.5rem; /* 200% */
  }
`;

const ProgressBar = styled.div<{ $pct: number }>`
  width: 8.05044rem;
  height: 0.31275rem;
  background-color: #f2f2f2;
  border: 1px solid #4c4c4c;
  border-radius: 4px;

  & > div {
    width: ${(props) => (props.$pct ? `${props.$pct}%` : "0%")};
    height: 100%;
    background-color: #4c4c4c;
  }
`;
