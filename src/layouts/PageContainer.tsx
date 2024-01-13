import styled from "styled-components";

interface IPageContainerProps {
  $h?: string;
  $display?: string;
  $justContent?: string;
}

const PageContainer = styled.div<IPageContainerProps>`
  height: ${(props) => (props.$h ? props.$h : "100vh")};
  padding: 4rem 0;

  display: ${(props) => (props.$display ? props.$display : "block")};
  justify-content: ${(props) =>
    props.$justContent ? props.$justContent : "normal"};
`;

export default PageContainer;
