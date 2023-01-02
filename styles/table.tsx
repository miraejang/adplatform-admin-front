import styled from "styled-components";

export const Row = styled.div`
  display: flex;
  padding: 1rem 2rem 1rem;
  color: ${({ theme }) => theme.colors.txt};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};

  & > div {
    flex: 1;
    text-align: left;
  }
  .status > div {
    display: flex;
    justify-content: center;
    width: 2.7rem;
  }
  .edit {
    padding: 0.5rem;
    flex: 0 0 fit-content;
  }
  .right {
    text-align: right;
  }
`;
export const Table = styled.div``;
export const Head = styled.div`
  ${Row} {
    font-weight: 700;
    color: ${({ theme }) => theme.colors.txtLigthGray};
  }
`;
export const Body = styled.div``;
