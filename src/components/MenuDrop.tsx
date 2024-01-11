import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface IMenuDropProps {
  type: "módulo" | "aula";
  isEnabled: boolean;
  enableOrDisableOne: () => Promise<void>;
  deleteOne: () => Promise<void>;
}

export default function MenuDrop({
  type,
  isEnabled,
  enableOrDisableOne,
  deleteOne,
}: IMenuDropProps) {
  const navigate = useNavigate();

  function callFn(
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    typeFn: "enable" | "delete",
  ) {
    e.stopPropagation();

    if (typeFn === "enable") {
      enableOrDisableOne();
    } else {
      deleteOne();
    }
  }

  return (
    <Container>
      <Option onClick={(e) => callFn(e, "enable")}>
        <h6>
          {isEnabled ? "Desabilitar" : "Habilitar"} {type}
        </h6>
      </Option>
      <Separator>
        <div />
      </Separator>
      <Option onClick={() => navigate("/edit-module")}>
        <h6>Editar {type}</h6>
      </Option>
      <Separator>
        <div />
      </Separator>
      <Option onClick={(e) => callFn(e, "delete")}>
        <h6>Deletar {type}</h6>
      </Option>
    </Container>
  );
}

const Container = styled.div`
  width: 8.875rem;
  border-radius: 0.875rem;
  background: var(--white);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  padding: 0.37rem 0rem;
  position: absolute;
  top: 0;
  right: -9.565rem;
`;

const Option = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 1.4375rem;
  border-radius: 0.875rem;

  &:hover {
    background: rgba(224, 224, 224, 0.9);
  }

  h6 {
    color: var(--black);
    font-family: Montserrat;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 600;
    line-height: 1rem; /* 133.333% */
    letter-spacing: -0.03rem;
  }
`;

const Separator = styled.div`
  height: 0.5625rem;
  display: flex;
  justify-content: center;
  align-items: center;

  div {
    width: 7.375rem;
    height: 0.0625rem;
    background: #ebecf0;
  }
`;
