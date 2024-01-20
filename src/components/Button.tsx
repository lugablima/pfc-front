/* eslint-disable react/require-default-props */
import { ButtonHTMLAttributes } from "react";
import styled from "styled-components";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  $w: number;
  $h: number;
  $textColor: string;
  $bgColor: string;
  text: string;
  $margin?: string;
  $borderRadius?: number;
  onClick?: () => void;
  type?: "button" | "reset" | "submit" | undefined;
}

export default function Button({
  $w,
  $h,
  text,
  $textColor,
  $bgColor,
  $margin,
  $borderRadius,
  onClick,
  type,
}: IButton) {
  return (
    <Container
      $w={$w}
      $h={$h}
      $textColor={$textColor}
      $bgColor={$bgColor}
      $margin={$margin}
      $borderRadius={$borderRadius}
      onClick={() => onClick?.()}
      type={type || "button"}
    >
      {text}
    </Container>
  );
}

const Container = styled.button<Omit<IButton, "text">>`
  width: ${(props) => `${props.$w}rem`};
  height: ${(props) => `${props.$h}rem`};
  border-radius: ${(props) =>
    props.$borderRadius ? `${props.$borderRadius}rem` : "6.25rem"};
  border: 3px solid ${(props) => props.$bgColor};
  background: ${(props) => props.$bgColor};
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

  color: ${(props) => props.$textColor};
  font-family: Montserrat;
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  line-height: 100%; /* 1rem */
  letter-spacing: -0.04rem;
  margin: ${(props) => (props.$margin ? props.$margin : 0)};

  &:hover {
    filter: brightness(0.97);
  }
`;
