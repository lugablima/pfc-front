import Modal from "react-modal";
import styled from "styled-components";
import Button from "./Button";
import { IModalContext, useModalContext } from "../contexts/ModalContext";

export default function CustomModal() {
  const {
    isModalOpen,
    modalInfos,
    setIsModalOpen,
    handleCancelClick,
    handleSendClick,
  } = useModalContext() as IModalContext;

  const customStyles: Modal.Styles = {
    content: {
      width: "23.5rem",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "0.25rem",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.70)",
      position: "fixed",
      top: "0",
      left: "0",
      zIndex: "2",
    },
  };

  Modal.setAppElement("#root");

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={() => setIsModalOpen(false)}
      style={customStyles}
    >
      <Text>
        O exercício passou em {modalInfos?.resolution.grade.toFixed(2)}% dos
        testes
      </Text>
      <Text>Gostaria de enviar a resolução?</Text>
      <ButtonsContainer>
        <Button
          $w={7.123}
          $h={2.75}
          $bgColor="#009FE0"
          $textColor="#FFF"
          text="Cancelar"
          $margin="0"
          onClick={handleCancelClick}
        />
        <Button
          $w={5.875}
          $h={2.75}
          $bgColor="#009FE0"
          $textColor="#FFF"
          text="Enviar"
          $margin="0"
          onClick={handleSendClick}
        />
      </ButtonsContainer>
    </Modal>
  );
}

const Text = styled.h6`
  color: var(--black);
  text-align: center;
  margin-bottom: 0.75rem;

  font-family: Montserrat;
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  line-height: 100%; /* 1rem */
  letter-spacing: -0.04rem;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 2rem;
  margin-top: 2.25rem;
`;
