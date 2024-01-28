/* eslint-disable no-throw-literal */
import axios, { AxiosResponse } from "axios";

import api from "./api";

export interface IVideoOrSummary {
  id: string;
  url: string;
  class: {
    id: string;
    name: string;
  };
}

export async function getOne(token: string, classId: string) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response: AxiosResponse<IVideoOrSummary> = await api.get(
      `/videos/${classId}`,
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
