/* eslint-disable react/jsx-no-useless-fragment */
import styled from "styled-components";
import Tab from "./Tab";
import {
  IExercisesContext,
  useExercisesContext,
} from "../contexts/ExercisesContext";

interface ITabsProps {
  selectedTab: number;
  onChangeTab: (newSelectedTab: number) => void;
}

export default function Tabs({ selectedTab, onChangeTab }: ITabsProps) {
  const { exercises } = useExercisesContext() as IExercisesContext;

  return (
    <>
      {exercises && exercises?.length > 1 && (
        <Container>
          {exercises.map((ex, idx) => (
            <Tab
              key={ex.id}
              label={`${ex.sequence}`}
              index={idx}
              value={selectedTab}
              onClick={() => onChangeTab(idx)}
              $bg={ex.resolutions.length ? "#009FE0B2" : "#f7f8fa"}
            />
          ))}
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: inline-flex;
  height: 1.75rem;
  align-items: center;
  flex-shrink: 0;

  border-radius: 0.875rem;
  border: 1px solid #c9ccd6;
  background: var(--secondary);

  & > div:first-child {
    border-radius: 0.875rem 0 0 0.875rem;
  }

  & > div:last-child {
    border-radius: 0 0.875rem 0.875rem 0;
  }
`;
