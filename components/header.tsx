import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { resourceLimits } from "worker_threads";
import { UserIcon } from "../styles/icons";
import viewerMode from "./states";

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
    display: flex;
    align-items: center;
    height: ${({ theme }) => theme.heights.header};
    padding: 0 1rem;

    span {
      height: 1.8rem;
      margin-right: 0.2rem;
    }

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
  const [user, setUser] = useState();
  const [userInfoOpen, setUserInfoOpen] = useState(false);
  const [viewer, setViewer] = useRecoilState(viewerMode);
  const viewerModeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setViewer(event.target.value);
  };

  useEffect(() => {
    (async () => {
      const results = await (await fetch(`/api/auth/me`)).json();
      setUser(results);
    })();
  }, []);

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
                ?????????
              </Link>
            </li>
            {viewer === "admin" && (
              <li>
                <Link
                  className={router.pathname === "/users" ? "active" : ""}
                  href="/users"
                >
                  ?????????
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </NavBox>
      <UserBox>
        <User>
          <button
            className={userInfoOpen ? "active" : ""}
            onClick={() => setUserInfoOpen(!userInfoOpen)}
          >
            <UserIcon />
            {user.email}
          </button>
          <div className={userInfoOpen ? "open" : ""}>
            <div className="name">{user.name}</div>
            <div className="email">{user.email}</div>
            <div className="company">{user.company.name}</div>
          </div>
        </User>
        <ViewerMode>
          <div>
            <select
              onChange={viewerModeHandler}
              disabled={router.pathname === "/users"}
              defaultValue={viewer}
              name="viwer_mode"
              id="viwer_mode"
            >
              <option value="admin">?????????</option>
              <option value="manager">?????????</option>
              <option value="viewer">??????</option>
            </select>
          </div>
        </ViewerMode>
      </UserBox>
    </HEADER>
  );
};

export default Header;
