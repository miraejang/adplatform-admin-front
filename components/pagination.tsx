import { useEffect, useState } from "react";
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
interface IPagination {
  total: number;
  current: number;
  showCount?: number;
  changeCurrent: (page: number) => void;
}

const Pagination = ({
  total,
  current,
  showCount = 5,
  changeCurrent,
}: IPagination) => {
  const [currentPages, setCurrentPages] = useState<number[]>([]);

  useEffect(() => {
    let start = 1;
    let end = total;
    let front = Math.floor((showCount - 1) / 2);
    let back = Math.ceil((showCount - 1) / 2);
    const arr = [];

    if (total > showCount) {
      if (current - front > 1) {
        if (current + back > total) {
          start = total - (showCount - 1);
        } else {
          start = current - front;
          end = current + back;
        }
      } else {
        end = showCount;
      }
    }

    for (let i = start; i <= end; i++) {
      arr.push(i);
    }

    setCurrentPages(arr);
  }, [current]);

  const onClick = (page: number) => {
    changeCurrent(page < 1 ? 1 : page > total ? total : page);
  };

  return (
    <PAGINATION>
      <First onClick={() => onClick(1)}>
        <p>첫 페이지</p>
      </First>
      <Prev onClick={() => onClick(current - 1)}>
        <p>이전 페이지</p>
      </Prev>
      <Pages>
        {currentPages.map((page) => (
          <li className={page === current ? "active" : ""} key={page}>
            <Btn onClick={() => onClick(page)}>{page}</Btn>
          </li>
        ))}
      </Pages>
      <Next onClick={() => onClick(current + 1)}>
        <p>다음 페이지</p>
      </Next>
      <Last onClick={() => onClick(total)}>
        <p>마지막 페이지</p>
      </Last>
    </PAGINATION>
  );
};

export default Pagination;
