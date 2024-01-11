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
import userIcon from "../assets/images/user-icon.svg";
import emailIcon from "../assets/images/email-icon.svg";
import lockIcon from "../assets/images/lock-icon.svg";
import { IUserContext, useUserContext } from "../contexts/UserContext";
import { signInUserOrFail, signUpUserOrFail } from "../services/authService";

export interface ISignUpUser {
  name: string;
  email: string;
  password: string;
}

export default function SignUp() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const { user, setUser } = useUserContext() as IUserContext;

  useEffect(() => {
    if (user) navigate("/modules");
  }, [user]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const body: ISignUpUser = {
      name,
      email,
      password,
    };

    try {
      await signUpUserOrFail(body);

      const userData = await signInUserOrFail({ email, password });

      setName("");
      setEmail("");
      setPassword("");
      setUser(userData);
    } catch (error) {
      alert(error);
    }
  }

  return (
    <Container>
      <Content onSubmit={(e) => handleSubmit(e)}>
        <h5>Cadastro</h5>
        <InputBox>
          <img src={userIcon} alt="Usuário" />
          <input
            type="text"
            placeholder="Nome Completo"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </InputBox>
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
        <SubmitButton type="submit">Cadastrar</SubmitButton>
        <h6 onClick={() => navigate("/")}>
          Já tem uma conta? <span>Entrar</span>
        </h6>
      </Content>
    </Container>
  );
}
