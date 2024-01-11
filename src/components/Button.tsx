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
  onClick?: () => void;
}

export default function Button({
  $w,
  $h,
  text,
  $textColor,
  $bgColor,
  $margin,
  onClick,
}: IButton) {
  return (
    <Container
      $w={$w}
      $h={$h}
      $textColor={$textColor}
      $bgColor={$bgColor}
      $margin={$margin}
      onClick={() => onClick?.()}
    >
      {text}
    </Container>
  );
}

const Container = styled.button<Omit<IButton, "text">>`
  width: ${(props) => `${props.$w}rem`};
  height: ${(props) => `${props.$h}rem`};
  border-radius: 6.25rem;
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
