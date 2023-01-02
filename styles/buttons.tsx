import styled from "styled-components";

const Btn = styled.button`
  margin: 0 0.5rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
`;
export const BlueBtn = styled(Btn)`
  background-color: ${({ theme }) => theme.colors.pointBlue};
  color: #fff;
`;
export const GrayBtn = styled(Btn)`
  background-color: #f7f7f7;
  color: ${({ theme }) => theme.colors.txtGray};
`;
export const IconBtn = styled.button`
  span {
    position: absolute;
    overflow: hidden;
    height: 1px;
    width: 1px;
    border: 0;
    clip: rect(1px, 1px, 1px, 1px);
    clip-path: inset(50%);
    word-break: initial;
    word-wrap: initial;
  }
`;
