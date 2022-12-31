import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";

const HEADER = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  background-color: ${({ theme }) => theme.colors.pointBlue};
  color: #fff;
`;
const NavBox = styled.div`
  display: flex;

  .logo {
    display: flex;
    align-items: center;
    height: ${({ theme }) => theme.heights.header};
    padding: 0 1rem;

    &:hover {
      background-color: ${({ theme }) => theme.colors.tintLightBlack};
    }
  }

  nav ul {
    display: flex;

    a {
      display: flex;
      align-items: center;
      height: ${({ theme }) => theme.heights.header};
      padding: 0 1rem;

      &:hover,
      &.active {
        background-color: ${({ theme }) => theme.colors.tintLightBlack};
      }
    }
  }
`;
const UserBox = styled.div`
  display: flex;
`;
const User = styled.div`
  position: relative;

  button {
    height: ${({ theme }) => theme.heights.header};
    padding: 0 1rem;

    &:hover,
    &.active {
      background-color: ${({ theme }) => theme.colors.tintLightBlack};
    }
  }

  & > div {
    display: none;
    position: absolute;
    top: 110%;
    right: 0;
    padding: 1rem;
    border-radius: 0.5rem;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    color: ${({ theme }) => theme.colors.txtGray};

    &.open {
      display: block;
    }
  }
`;
const ViewerMode = styled.div`
  height: ${({ theme }) => +theme.heights.header};
  padding: 0.5rem 1rem;

  div {
    height: 100%;
    padding-right: 0.5rem;
    border-radius: 0.5rem;
    background-color: #fff;

    select {
      height: 100%;
      padding: 0 1rem;
      border: 0;
      border-radius: 0.5rem;
      font-size: inherit;
    }
  }
`;

const Header = () => {
  const router = useRouter();
  const [userInfoOpen, setUserInfoOpen] = useState(false);

  useEffect(() => {
    setUserInfoOpen(false);
  }, [router]);

  return (
    <HEADER>
      <NavBox>
        <div className="logo">
          <Link href="/">Wisebirds</Link>
        </div>
        <nav>
          <ul>
            <li>
              <Link
                className={router.pathname === "/campaigns" ? "active" : ""}
                href="/campaigns"
              >
                캠페인
              </Link>
            </li>
            <li>
              <Link
                className={router.pathname === "/users" ? "active" : ""}
                href="/users"
              >
                사용자
              </Link>
            </li>
          </ul>
        </nav>
      </NavBox>
      <UserBox>
        <User>
          <button
            className={userInfoOpen ? "active" : ""}
            onClick={() => setUserInfoOpen(!userInfoOpen)}
          >
            abc@abc.com
          </button>
          <div className={userInfoOpen ? "open" : ""}>
            <div className="name">홍길동</div>
            <div className="email">abc@abc.com</div>
            <div className="company">와이즈버즈</div>
          </div>
        </User>
        <ViewerMode>
          <div>
            <select name="viwer_mode" id="viwer_mode">
              <option value="admin">어드민</option>
              <option value="manager">매니저</option>
              <option value="viewer">뷰어</option>
            </select>
          </div>
        </ViewerMode>
      </UserBox>
    </HEADER>
  );
};

export default Header;
