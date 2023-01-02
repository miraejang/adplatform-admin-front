import styled from "styled-components";
import { GrayBtn, IconBtn } from "./buttons";

export const CloseBtn = styled(IconBtn)`
  position: absolute;
  top: 2rem;
  right: 2rem;

  &::before {
    content: "×";
    font-weight: 700;
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.txtGray};
  }
`;
export const Form = styled.form`
  margin-top: 1rem;

  div {
    position: relative;
  }

  & > div {
    margin-bottom: 1rem;
  }

  label,
  .labelStyleBox {
    display: block;
    padding: 0.5rem 0;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.txtGray};

    &.required span {
      position: relative;
    }

    &.required span::after {
      content: "";
      display: block;
      position: absolute;
      top: 10%;
      left: 104%;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background-color: red;
    }
  }

  input,
  .inputStyleBox {
    width: 30rem;
    padding: 0.7rem;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
  }
  .inputStyleBox {
    border: 0;
    padding: 0;
  }
`;
export const InputWrap = styled.div`
  overflow: hidden;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 0.5rem;

  input {
    border: 0;
  }
`;
export const MaskingBtn = styled(GrayBtn)`
  position: absolute;
  top: 1px;
  right: 1px;
  height: calc(100% - 2px);
  margin: 0;
  border-radius: 0 0.5rem 0.5rem 0;
`;
export const BtnBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;
export const ErorrMessage = styled.p`
  display: inline-block;
  position: absolute;
  top: 100%;
  left: 0;
  padding: 0.4rem;
  color: red;
  border-radius: 0.5rem;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  background-color: #fff;
  font-size: 0.8rem;
  z-index: 1;
`;
export const Icon = styled.span`
  height: 100%;
`;
