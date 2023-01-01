import styled from "styled-components";

const PAGINATION = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2rem 0;
`;
const Btn = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  color: #888;

  &:hover {
    font-weight: 700;
    color: #348efc;
  }
`;
const ArrowBtn = styled(Btn)`
  position: relative;
  font-size: 1.3rem;

  p {
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
const First = styled(ArrowBtn)`
  &::before {
    content: "«";
  }
`;
const Prev = styled(ArrowBtn)`
  &::before {
    content: "‹";
  }
`;
const Next = styled(ArrowBtn)`
  &::before {
    content: "›";
  }
`;
const Last = styled(ArrowBtn)`
  &::before {
    content: "»";
  }
`;
const Pages = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;

  .active button {
    font-weight: 700;
    border: 1px solid #348efc;
    color: #348efc;
  }
`;

const Pagination = () => {
  return (
    <PAGINATION>
      <First>
        <p>첫 페이지</p>
      </First>
      <Prev>
        <p>이전 페이지</p>
      </Prev>
      <Pages>
        <li className="active">
          <Btn>1</Btn>
        </li>
        <li>
          <Btn>2</Btn>
        </li>
        <li>
          <Btn>3</Btn>
        </li>
        <li>
          <Btn>4</Btn>
        </li>
      </Pages>
      <Next>
        <p>다음 페이지</p>
      </Next>
      <Last>
        <p>마지막 페이지</p>
      </Last>
    </PAGINATION>
  );
};

export default Pagination;
