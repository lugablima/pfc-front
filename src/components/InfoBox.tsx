/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import styled from "styled-components";

import infoBlue from "../assets/images/info-blue.svg";
import closeIcon from "../assets/images/close-icon.svg";

interface IInfoBoxProps {
  onClick: () => void;
}

export default function InfoBox({ onClick }: IInfoBoxProps) {
  const infoMsg = {
    exercises: [
      {
        name: "Maior valor",
        statement: "Dado um array de inteiros...",
        tests: [
          {
            inputs: [10, 20, 30],
            inputDataType: "int array",
            result: 30,
            resultDataType: "int",
          },
          {
            inputs: [50, 60, 70],
            inputDataType: "int array",
            result: 70,
            resultDataType: "int",
          },
        ],
      },
    ],
  };
  // const infoMsg = `
  //       {
  //         "exercise_[sequence]": {
  //           "name": "Maior Valor",
  //           "statement": "Considere um array...",
  //           "tests": {
  //             "test_[sequence]": {
  //               "inputs": {
  //                 "parameter_1": [10, 25, 50]
  //               },
  //               "result": 50,
  //             }
  //           }
  //         }
  //       }`;

  return (
    <Container>
      <Header>
        <img src={infoBlue} alt="Info icon" />
        <h5>Estrutura do arquivo JSON</h5>
        <img src={closeIcon} alt="Close icon" onClick={() => onClick()} />
      </Header>
      <pre>{JSON.stringify(infoMsg, null, 4)}</pre>
    </Container>
  );
}

const Container = styled.div`
  /* display: flex;
  flex-direction: column;
  align-items: center; */
  width: 21.75rem;
  height: 18rem;
  padding: 0.625rem 0.75rem;
  position: absolute;
  top: 0;
  left: calc(100% - 3.8rem);
  z-index: 1;

  border-radius: 0.25rem;
  background: var(--primary);
  box-shadow: 0px 6px 20px 0px rgba(145, 145, 145, 0.47);
  overflow-y: auto;

  pre {
    color: var(--white);
    font-feature-settings:
      "clig" off,
      "liga" off;

    font-family: Inter;
    font-size: 0.8125rem;
    font-style: normal;
    font-weight: 500;
    margin-left: 1rem;
    align-self: stretch;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 0.25rem;

  & > h5 {
    color: var(--white);
    font-feature-settings:
      "clig" off,
      "liga" off;

    font-family: Inter;
    font-size: 0.8125rem;
    font-style: normal;
    font-weight: 600;
    margin-left: 0.5rem;
  }

  img {
    width: 1rem;
    height: 1rem;
  }

  img:last-child {
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
  }
`;
