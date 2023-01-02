import { PropsWithChildren } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const MODAL = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.tintBlack};
`;
const Content = styled.div`
  position: relative;
  width: 50rem;
  padding: 2rem;
  border-radius: 0.5rem;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const ModalOverlay = ({ children }: PropsWithChildren) => {
  return (
    <MODAL>
      <Content>{children}</Content>
    </MODAL>
  );
};

const Modal = (props: PropsWithChildren) => {
  const selectedElement = document.getElementById("modal") as HTMLElement;

  return (
    <>
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        selectedElement
      )}
    </>
  );
};

export default Modal;
