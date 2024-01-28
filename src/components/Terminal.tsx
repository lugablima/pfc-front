/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from "styled-components";

interface ITerminalProps {
  outputDetails: any;
}

export default function Terminal({ outputDetails }: ITerminalProps) {
  const getOutput = () => {
    const statusId = outputDetails?.status?.id;

    if (statusId === 6) {
      // compilation error
      return (
        <pre style={{ color: "red" }}>
          {atob(outputDetails?.compile_output)}
        </pre>
      );
    }
    if (statusId === 3) {
      return (
        <pre style={{ color: "green" }}>
          {atob(outputDetails.stdout) !== null
            ? `${atob(outputDetails.stdout)}`
            : null}
        </pre>
      );
    }
    if (statusId === 5) {
      return <pre style={{ color: "red" }}>Time Limit Exceeded</pre>;
    }

    return <pre style={{ color: "red" }}>{atob(outputDetails?.stderr)}</pre>;
  };

  return (
    <Container>
      <Header>
        <h5>Terminal</h5>
      </Header>
      <Content>
        {outputDetails ? (
          getOutput()
        ) : (
          <pre>
            Clique em &quot;Checar exercício&quot; para ver o resultado dos
            testes neste terminal!
          </pre>
        )}
      </Content>
    </Container>
  );
}

const Container = styled.div`
  /* width: 100%; */
  height: 15.125rem;
  border-radius: 0.25rem;
  margin-top: 0.25rem;
`;

const Header = styled.div`
  /* width: 50.375rem; */
  height: 2.5625rem;
  display: flex;
  align-items: center;
  padding-left: 0.75rem;
  background: #2b2d30;

  h5 {
    color: #dfe1e5;
    font-feature-settings:
      "clig" off,
      "liga" off;
    font-family: Inter;
    font-size: 0.8125rem;
    font-style: normal;
    font-weight: 600;
  }
`;

const Content = styled.div`
  height: 12.4375rem;
  padding: 0.75rem;
  background: #1e1f22;

  pre {
    color: #dfe1e5;
    font-feature-settings:
      "clig" off,
      "liga" off;

    font-family: "JetBrains Mono";
    font-size: 0.8125rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1.375rem; /* 169.231% */
  }
`;
