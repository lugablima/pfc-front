/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useNavigate } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";

import {
  Container,
  Content,
  InputBox,
  SubmitButton,
} from "../layouts/AuthForm";
import emailIcon from "../assets/images/email-icon.svg";
import lockIcon from "../assets/images/lock-icon.svg";
import { IUserContext, useUserContext } from "../contexts/UserContext";
import { signInUserOrFail } from "../services/authService";
import { ILoaderContext, useLoaderContext } from "../contexts/LoaderContext";

export interface ISignInUser {
  email: string;
  password: string;
}

export default function SignIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { user, setUser } = useUserContext() as IUserContext;
  const { showLoader, hideLoader } = useLoaderContext() as ILoaderContext;
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/modules");
  }, [user]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const body: ISignInUser = {
      email,
      password,
    };

    try {
      showLoader();
      const data = await signInUserOrFail(body);

      setUser(data);
      setEmail("");
      setPassword("");
    } catch (error) {
      alert(error);
    } finally {
      hideLoader();
    }
  }

  return (
    <Container>
      <Content onSubmit={(e) => handleSubmit(e)}>
        <h5>Entrar</h5>
        <InputBox>
          <img src={emailIcon} alt="Carta" />
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputBox>
        <InputBox>
          <img src={lockIcon} alt="Cadeado" />
          <input
            type="password"
            placeholder="Senha"
            required
            minLength={6}
            maxLength={12}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputBox>
        <SubmitButton type="submit">Entrar</SubmitButton>
        <h6 onClick={() => navigate("/sign-up")}>
          Não tem uma conta? <span>Cadastre-se</span>
        </h6>
      </Content>
    </Container>
  );
}
