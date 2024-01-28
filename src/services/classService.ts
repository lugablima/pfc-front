/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-throw-literal */
import axios, { AxiosResponse } from "axios";

import api from "./api";
import { IExercises } from "../contexts/ExercisesContext";

export interface IClass {
  id: string;
  name: string;
  imageUrl: string;
  isEnabled: boolean;
  moduleId: string;
  dueDate: string;
  videoUrl: string;
  summaryUrl: string;
  module: {
    name: string;
  };
}

export type TGetAllClasses = Omit<IClass, "videoUrl" | "summaryUrl">;

export async function getAll(token: string, moduleId: string) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response: AxiosResponse<TGetAllClasses[]> = await api.get(
      `/classes/${moduleId}`,
      config,
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data;
    } else {
      throw "Algum erro ocorreu, por favor, recarregue a página!";
    }
  }
}

export interface ITest {
  id: string;
  inputs: any;
  inputDataType: string;
  result: any;
  resultDataType: string;
}

interface IExercise {
  id: string;
  name: string;
  sequence: number;
  statement: string;
  test: ITest[];
}

export interface IGetClassInfosForEdit {
  id: string;
  name: string;
  imageUrl: string;
  dueDate: string;
  video: {
    url: string;
  };
  summary: {
    url: string;
  };
  exercises: IExercise[];
}

export async function getInfosForEdit(token: string, classId: string) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response: AxiosResponse<IGetClassInfosForEdit> = await api.get(
      `/classes/${classId}/edit`,
      config,
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data;
    } else {
      throw "Algum erro ocorreu, por favor, recarregue a página!";
    }
  }
}

export async function getAllExercises(token: string, classId: string) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response: AxiosResponse<IExercises[]> = await api.get(
      `/classes/${classId}/exercises`,
      config,
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data;
    } else {
      throw "Algum erro ocorreu, por favor, recarregue a página!";
    }
  }
}

export type TCreateClassPayload = Omit<
  IClass,
  "id" | "isEnabled" | "module"
> & {
  exerciseFile: {
    name: string;
    size: number;
    value: string;
    content: string;
  };
};

export async function create(token: string, data: TCreateClassPayload) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response: AxiosResponse<string> = await api.post(
      `/classes`,
      data,
      config,
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data;
    } else {
      throw "Algum erro ocorreu, por favor, recarregue a página!";
    }
  }
}

export async function edit(
  token: string,
  classId: string,
  data: TCreateClassPayload,
) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response: AxiosResponse<string> = await api.put(
      `/classes/${classId}`,
      data,
      config,
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data;
    } else {
      throw "Algum erro ocorreu, por favor, recarregue a página!";
    }
  }
}

export async function enableOrDisableOne(
  token: string,
  classId: string,
  enableOrDisable: "enable" | "disable",
) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response: AxiosResponse<string> = await api.put(
      `/classes/${classId}/${enableOrDisable}`,
      null,
      config,
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data;
    } else {
      throw "Algum erro ocorreu, por favor, recarregue a página!";
    }
  }
}

export async function deleteOne(token: string, classId: string) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response: AxiosResponse<string> = await api.delete(
      `/classes/${classId}`,
      config,
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data;
    } else {
      throw "Algum erro ocorreu, por favor, recarregue a página!";
    }
  }
}
