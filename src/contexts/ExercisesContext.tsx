/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useState, useContext } from "react";
import * as classService from "../services/classService";

export interface IResolution {
  id: string;
  userId: string;
  resolution: string;
  grade: number;
}

export interface IExercises {
  id: string;
  name: string;
  sequence: number;
  statement: string;
  class: {
    id: string;
    dueDate: string;
  };
  tests: classService.ITest[];
  resolutions: IResolution[];
}

export interface IExercisesContext {
  exercises: IExercises[] | null;
  setExercises: React.Dispatch<React.SetStateAction<IExercises[] | null>>;
  grade: number | null;
  setGrade: React.Dispatch<React.SetStateAction<number | null>>;
  fetchExercises: (token: string, classId: string) => Promise<void>;
}

interface Props {
  children: React.ReactNode;
}

const ExercisesContext = createContext<IExercisesContext | null>(null);

export const useExercisesContext = () => useContext(ExercisesContext);

export default function ExercisesProvider({ children }: Props) {
  const [exercises, setExercises] = useState<IExercises[] | null>(null);
  const [grade, setGrade] = useState<number | null>(null);

  const fetchExercises = async (token: string, classId: string) => {
    try {
      const res = await classService.getAllExercises(token, classId);

      setExercises(res);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <ExercisesContext.Provider
      value={{ exercises, setExercises, grade, setGrade, fetchExercises }}
    >
      {children}
    </ExercisesContext.Provider>
  );
}
