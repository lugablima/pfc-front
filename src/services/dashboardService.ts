/* eslint-disable no-throw-literal */
/* eslint-disable import/prefer-default-export */
import axios, { AxiosResponse } from "axios";

import api from "./api";

export interface IDashboardUser {
  id: string;
  name: string;
  resolutionsCount: number;
}

export interface IGetDashboardData {
  exercisesCount: number;
  users: IDashboardUser[];
}

export async function getDashboardData(token: string) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response: AxiosResponse<IGetDashboardData> = await api.get(
      `/exercises/dashboard`,
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

interface IDashboardResolution {
  id: string;
  grade: number;
  resolution: string;
}

interface IDashboardClass {
  id: string;
  name: string;
  sequence: number;
  isEnabled: boolean;
  createdAt: string;
  module: IDashboardModule;
}

type IDashboardModule = Omit<IDashboardClass, "module">;

interface IDashboardExercise {
  id: string;
  name: string;
  sequence: number;
  resolutions: IDashboardResolution[];
  class: IDashboardClass;
}

export interface IGetDashboardDataForUser {
  id: string;
  name: string;
  exercises: IDashboardExercise[];
}

export async function getDashboardDataForUser(token: string, userId: string) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response: AxiosResponse<IGetDashboardDataForUser> = await api.get(
      `/exercises/dashboard/${userId}`,
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
