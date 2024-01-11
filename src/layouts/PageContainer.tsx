import styled from "styled-components";

interface IPageContainerProps {
  $display?: string;
  $justContent?: string;
}

const PageContainer = styled.div<IPageContainerProps>`
  height: 100vh;
  padding: 4rem 0;

  display: ${(props) => (props.$display ? props.$display : "block")};
  justify-content: ${(props) =>
    props.$justContent ? props.$justContent : "normal"};
`;

export default PageContainer;
