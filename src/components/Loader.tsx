import styled from "styled-components";
import { ILoaderContext, useLoaderContext } from "../contexts/LoaderContext";

function Loader() {
  const { isLoading } = useLoaderContext() as ILoaderContext;

  return (
    <LoaderOverlay $isLoading={isLoading}>
      <LoaderSpin />
    </LoaderOverlay>
  );
}

export default Loader;

const LoaderOverlay = styled.div<{ $isLoading: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: ${(props) => (props.$isLoading ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  z-index: 3;
`;

const LoaderSpin = styled.div`
  border: 8px solid #f3f3f3;
  border-top: 8px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
