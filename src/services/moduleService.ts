/* eslint-disable no-throw-literal */
import axios, { AxiosResponse } from "axios";

import api from "./api";
import {
  IClass,
  IGetClassInfosForEdit,
  TCreateClassPayload,
} from "./classService";

export interface IModule {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  isEnabled: boolean;
  createdAt: string;
}

export async function getAll(token: string) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response: AxiosResponse<IModule[]> = await api.get(
      "/modules",
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

export interface IGetModuleInfosForEdit {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  classes: IGetClassInfosForEdit[];
}

export async function getInfosForEdit(token: string, moduleId: string) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response: AxiosResponse<IGetModuleInfosForEdit> = await api.get(
      `/modules/${moduleId}`,
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

export type TCreateModulePayload = Omit<
  IModule,
  "id" | "createdAt" | "isEnabled"
> & {
  classes: Omit<TCreateClassPayload, "moduleId">[];
};

export async function create(token: string, data: TCreateModulePayload) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response: AxiosResponse<string> = await api.post(
      `/modules`,
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

type TEditClassPayload = Omit<IClass, "moduleId" | "isEnabled" | "module"> & {
  exerciseFile: {
    name: string;
    size: number;
    value: string;
    content: string;
  };
};

export type TEditModulePayload = Partial<
  Omit<IModule, "id" | "createdAt" | "isEnabled">
> & {
  classes: TEditClassPayload[];
};

export async function edit(
  token: string,
  moduleId: string,
  data: TEditModulePayload,
) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response: AxiosResponse<string> = await api.put(
      `/modules/${moduleId}`,
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
  moduleId: string,
  enableOrDisable: "enable" | "disable",
) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response: AxiosResponse<string> = await api.put(
      `/modules/${moduleId}/${enableOrDisable}`,
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

export async function deleteOne(token: string, moduleId: string) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response: AxiosResponse<string> = await api.delete(
      `/modules/${moduleId}`,
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
