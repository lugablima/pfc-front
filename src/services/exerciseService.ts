/* eslint-disable no-throw-literal */
/* eslint-disable import/prefer-default-export */
import axios, { AxiosResponse } from "axios";

import api from "./api";

export interface ICreateOrUpdateResolution {
  resolution: string;
  grade: number;
}

export async function createOrUpdateResolution(
  token: string,
  exerciseId: string,
  data: ICreateOrUpdateResolution,
) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response: AxiosResponse<string> = await api.post(
      `/exercises/${exerciseId}/resolution`,
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
