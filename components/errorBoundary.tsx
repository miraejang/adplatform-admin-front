import React, { Component, ErrorInfo, ReactNode } from "react";
import styled from "styled-components";
import { BlueBtn } from "../styles/buttons";
import Modal from "./modal";

interface Props {
  children?: ReactNode;
}
interface State {
  hasError: boolean;
}

const Container = styled.div`
  p {
    margin-bottom: 2rem;
  }
`;
const BtnBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Modal>
          <Container>
            <p>
              에러가 발생했습니다.
              <br />
              같은 현상이 반복되면 고객센터로 문의 바랍니다.
            </p>
            <p>
              ⁕ 고객센터
              <br />- email: helpdesk@wisebirds.ai
            </p>
            <BtnBox>
              <BlueBtn onClick={() => this.setState({ hasError: false })}>
                확인
              </BlueBtn>
            </BtnBox>
          </Container>
        </Modal>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
