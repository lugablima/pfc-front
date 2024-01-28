/* eslint-disable react/jsx-no-constructed-context-values */
import {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";
import { ICreateOrUpdateResolution } from "../services/exerciseService";
import * as exerciseService from "../services/exerciseService";
import { IExercisesContext, useExercisesContext } from "./ExercisesContext";

export interface IModalInfos {
  token: string;
  exerciseId: string;
  classId: string;
  resolution: ICreateOrUpdateResolution;
}

export interface IModalContext {
  isModalOpen: boolean;
  modalInfos: IModalInfos | null;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  handleOpenModal: (modalProps: IModalInfos) => void;
  handleCancelClick: () => void;
  handleSendClick: () => Promise<void>;
}

interface Props {
  children: ReactNode;
}

const ModalContext = createContext<IModalContext | null>(null);

export const useModalContext = () => useContext(ModalContext);

export default function ModalProvider({ children }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInfos, setModalInfos] = useState<IModalInfos | null>(null);
  const { fetchExercises } = useExercisesContext() as IExercisesContext;

  const handleOpenModal = (modalProps: IModalInfos) => {
    console.log("ModalProps: ", modalProps);
    setModalInfos(modalProps);
    setIsModalOpen(true);
  };

  const handleCancelClick = () => {
    console.log("Cancel clicado");
    setModalInfos(null);
    setIsModalOpen(false);
  };

  const handleSendClick = async () => {
    console.log("Enviar clicado");
    await exerciseService.createOrUpdateResolution(
      modalInfos?.token as string,
      modalInfos?.exerciseId as string,
      modalInfos?.resolution as ICreateOrUpdateResolution,
    );

    await fetchExercises(
      modalInfos?.token as string,
      modalInfos?.classId as string,
    );
    handleCancelClick();
  };

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        modalInfos,
        setIsModalOpen,
        handleOpenModal,
        handleCancelClick,
        handleSendClick,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
