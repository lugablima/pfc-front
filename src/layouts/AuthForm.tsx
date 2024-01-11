import styled from "styled-components";
import PageContainer from "./PageContainer";

const Container = styled(PageContainer)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.form`
  width: 19.1875rem;
  /* height: 19rem; */
  border-radius: 0.875rem;
  background: var(--secondary);
  box-shadow: 0px 4px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 0.25rem;

  h5 {
    color: var(--tertiary);
    text-align: center;
    font-family: Poppins;
    font-size: 1.625rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin-bottom: 0.83rem;
  }

  h6 {
    color: var(--tertiary);
    text-align: center;
    font-family: Poppins;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    opacity: 0.7;
    cursor: pointer;
    margin-bottom: 0.54rem;

    &:hover {
      text-decoration: underline;
    }

    span {
      font-weight: 600;
    }
  }
`;

const InputBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 1rem 1.625rem;
  margin-bottom: 1rem;
  gap: 0.625rem;
  position: relative;

  border-radius: 1.875rem;
  border: 1px solid #eee;
  background: var(--white);

  img {
    width: 1.5rem;
    height: 1.5rem;
    /* opacity: 0.3; */
    position: absolute;
    top: 1;
    left: 1.625rem;
  }

  input {
    width: 100%;
    color: var(--tertiary);
    font-family: Poppins;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    padding-left: 1.75rem;
    border: none;
    outline: none;

    &::placeholder {
      opacity: 0.3;
    }
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1.125rem 1.625rem;
  margin-bottom: 0.54rem;
  border-radius: 1.875rem;
  border: none;
  background: var(--primary);

  color: var(--white);
  font-family: Poppins;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  &:hover {
    filter: brightness(0.95);
  }
`;

export { Container, Content, InputBox, SubmitButton };
