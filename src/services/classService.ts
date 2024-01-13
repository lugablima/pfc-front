/* eslint-disable no-throw-literal */
import axios, { AxiosResponse } from "axios";

import api from "./api";

export interface IClass {
  id: string;
  name: string;
  imageUrl: string;
  isEnabled: boolean;
  moduleId: string;
  dueDate: string;
}

export async function getAll(token: string, moduleId: string) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response: AxiosResponse<IClass[]> = await api.get(
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

export type TCreateClassPayload = Omit<
  IClass,
  "id" | "isEnabled" | "moduleId"
> & {
  videoUrl: string;
  summaryUrl: string;
};
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
