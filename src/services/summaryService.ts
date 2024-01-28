/* eslint-disable import/prefer-default-export */
/* eslint-disable no-throw-literal */
import axios, { AxiosResponse } from "axios";

import api from "./api";
import { IVideoOrSummary } from "./videoService";

export async function getOne(token: string, classId: string) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
      },
    };

    const response: AxiosResponse<IVideoOrSummary> = await api.get(
      `/summaries/${classId}`,
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
