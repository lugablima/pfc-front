import styled from "styled-components";

const Label = styled.h5<{ $mb?: number }>`
  color: var(--black);
  font-family: Dela Gothic One;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 400;
  letter-spacing: -0.06rem;
  text-align: left;
  margin-bottom: ${(props) => (props.$mb ? `${props.$mb}rem` : "0.75rem")};
`;

const Input = styled.input<{ $w?: number; $mb?: number }>`
  width: ${(props) => (props.$w ? `${props.$w}rem` : "31.25rem")};
  padding: 1.125rem 1.625rem;
  margin-bottom: ${(props) => (props.$mb ? `${props.$mb}rem` : "1rem")};

  border-radius: 1.875rem;
  border: 1px solid #eee;
  background: var(--white);

  color: var(--black);
  font-family: Poppins;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  &::placeholder {
    color: var(--tertiary);
    font-weight: normal;
  }
`;

const SubLabel = styled.h6<{ $m?: string }>`
  color: var(--gray-dark);

  font-family: Montserrat;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 600;
  letter-spacing: -0.045rem;
  /* margin-bottom: 0.5rem; */
  margin: ${(props) => (props.$m ? props.$m : "0 0 0.5rem 0")};
`;

const InfoIcon = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 0.875rem;
  background: var(--primary);
  background-repeat: no-repeat;
  background-position: 50% 50%;
  margin-left: 0.5rem;
  cursor: pointer;
`;

const FileInput = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 26.25rem;
  height: 6.125rem;

  border-radius: 0.25rem;
  border: 1px dashed #454545;
  background: var(--white);

  & > img {
    width: 2.125rem;
    height: 2.125rem;
    margin-right: 0.38rem;
  }

  & > h6 {
    color: var(--black);
    font-family: Roboto;
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

interface IFlexProps {
  $w?: number;
  $m?: string;
  $flexDirection?: string;
  $justifyContent?: string;
  $alignItems?: string;
  $position?: string;
}

const Flex = styled.div<IFlexProps>`
  width: ${(props) => (props.$w ? `${props.$w}rem` : "100%")};
  display: flex;
  flex-direction: ${(props) =>
    props.$flexDirection ? props.$flexDirection : "row"};
  justify-content: ${(props) =>
    props.$justifyContent ? props.$justifyContent : "center"};
  align-items: ${(props) => (props.$alignItems ? props.$alignItems : "center")};
  margin: ${(props) => (props.$m ? props.$m : "0")};
  position: ${(props) => (props.$position ? props.$position : "initial")};
`;

const FileBox = styled.div`
  width: 26.25rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0.875rem 0.75rem;
  margin-bottom: 0.5rem;
  position: relative;
  border-radius: 0.3125rem;
  background: rgba(126, 170, 255, 0.22);

  & > img {
    width: 2.375rem;
    height: 2.375rem;
    margin-right: 0.81rem;
  }

  & > img:last-child {
    width: 1.3125rem;
    height: 1.3125rem;
    position: absolute;
    top: calc(50% - (1.3125rem / 2));
    right: 0.75rem;
    cursor: pointer;
    margin-right: 0;
  }

  & > h6 {
    color: var(--black);
    font-family: Roboto;
    font-size: 0.8125rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

const FileButton = styled.button`
  width: 9.1875rem;
  height: 2.25rem;
  background-color: var(--primary);
  color: var(--white);
  border-radius: 0.25rem;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  margin: 0.75rem 0;
  border: none;

  font-family: Roboto;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  &:hover {
    filter: brightness(0.97);
  }
`;

const Separator = styled.div`
  width: 31.25rem;
  height: 0.0625rem;
  background: var(--gray-dark);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  margin-bottom: 0.75rem;
`;

const PlusButton = styled.button`
  width: 2.5rem;
  height: 2.5rem;

  border-radius: 6.25rem;
  border: none;
  background: var(--primary);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

  color: var(--white);
  font-family: Montserrat;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 700;
  letter-spacing: -0.06rem;
  margin-bottom: 2rem;

  &:hover {
    filter: brightness(0.97);
  }
`;

export {
  Label,
  Input,
  SubLabel,
  InfoIcon,
  FileInput,
  Flex,
  FileBox,
  FileButton,
  Separator,
  PlusButton,
};
