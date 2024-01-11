/* eslint-disable no-throw-literal */
import axios, { AxiosResponse } from "axios";

import { ISignInUser } from "../pages/SignIn";
import { ISignUpUser } from "../pages/SignUp";
import api from "./api";

export interface ISignInResponse {
  token: string;
  isAdmin: boolean;
}

export async function signInUserOrFail(userData: ISignInUser) {
  try {
    const response: AxiosResponse<ISignInResponse> = await api.post(
      "/sign-in",
      userData,
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data;
    } else {
      throw "Algum erro ocorreu, por favor, tente novamente mais tarde!";
    }
  }
}

export async function signUpUserOrFail(userData: ISignUpUser) {
  try {
    const response: AxiosResponse<string> = await api.post(
      "/sign-up",
      userData,
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data;
    } else {
      throw "Algum erro ocorreu, por favor, tente novamente mais tarde!";
    }
  }
}
