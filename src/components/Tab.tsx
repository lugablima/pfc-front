/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props */
import styled from "styled-components";

interface ITabProps extends React.HTMLAttributes<HTMLDivElement> {
  $bg?: string;
  label: string;
  index: number;
  value: number;
}

export default function Tab({
  $bg = "#f7f8fa",
  label,
  index,
  value,
  ...props
}: ITabProps) {
  return (
    <Container $bg={$bg} $isSelected={index === value} {...props}>
      <h6>{label}</h6>
    </Container>
  );
}

type TContainerProps = Pick<ITabProps, "$bg"> & {
  $isSelected: boolean;
};

const Container = styled.div<TContainerProps>`
  width: 4.5rem;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: ${(props) => (props.$isSelected ? "1px solid #C9CCD6" : "none")};

  background: ${(props) => (props.$isSelected ? "#EEE" : props.$bg)};

  h6 {
    color: var(--black);
    font-feature-settings:
      "clig" off,
      "liga" off;

    font-family: Inter;
    font-size: 0.8125rem;
    font-style: normal;
    font-weight: 500;
  }
`;
