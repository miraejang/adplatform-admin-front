import React, { useState } from "react";
import styled from "styled-components";
import CreateUserForm from "../components/createUserForm";
import EditUserForm from "../components/editUserForm";
import Pagination from "../components/pagination";
import viewerMode from "../components/states";
import { BlueBtn } from "../styles/buttons";

type User = {
  id: number;
  email: string;
  name: string;
  last_login_at: string;
};

const data = {
  content: [
    {
      id: 1,
      email: "user1@wisebirds.ai",
      name: "사용자1",
      last_login_at: "2022-11-14T07:37:24.914Z",
    },
    {
      id: 2,
      email: "user2@wisebirds.ai",
      name: "사용자2",
      last_login_at: "2022-11-14T07:37:24.914Z",
    },
    {
      id: 3,
      email: "user3@wisebirds.ai",
      name: "사용자3",
      last_login_at: "2022-11-14T07:37:24.914Z",
    },
  ],
  size: 25,
  total_elements: 2,
  total_pages: 1,
};

const Row = styled.div`
  display: flex;
  padding: 1rem;
  color: ${({ theme }) => theme.colors.txt};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};

  div {
    flex: 1;
    text-align: left;
  }
  .fit {
    flex: 0 0 fit-content;
    text-align: center;
  }
  .right {
    text-align: right;
  }
  .center {
    text-align: center;
  }
`;
const Table = styled.div``;
const Head = styled.div`
  ${Row} {
    font-weight: 700;
    color: ${({ theme }) => theme.colors.txtLigthGray};
  }
`;
const Body = styled.div``;
const BtnUserCreat = styled(BlueBtn)`
  margin: 1rem 2rem 1.5rem;
`;
const BtnUserEdit = styled.button`
  padding: 0;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.pointBlue};
`;

const Users = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [openCreate, setOpenCreate] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);

  const pageHandler = (page: number) => {
    setCurrentPage(page);
  };
  const editHandler = (data: User) => {
    setEditUser(data);
  };
  const createHandler = () => {
    setOpenCreate(true);
  };
  const closeHanlder = () => {
    setEditUser(null);
    setOpenCreate(false);
  };

  const dateFormat = (str: string) => {
    const date = new Date(str);
    const dateString = date
      .toLocaleDateString("ko-KR")
      .replaceAll(/\. /g, "-")
      .replace(/\.$/, "");
    const timeString = date.toLocaleTimeString("en-GB");
    return `${dateString} ${timeString}`;
  };

  return (
    <>
      <h1>사용자 관리</h1>
      <BtnUserCreat onClick={createHandler}>생성</BtnUserCreat>
      <Table>
        <Head>
          <Row>
            <div className="id">아이디</div>
            <div className="name">이름</div>
            <div className="last_login">마지막 로그인 일시</div>
            <div className="edit fit">수정</div>
          </Row>
        </Head>
        <Body>
          {data.content.map((user) => (
            <Row key={user.id}>
              <div className="id">{user.email}</div>
              <div className="name">{user.name}</div>
              <div className="last_login">{dateFormat(user.last_login_at)}</div>
              <div className="edit fit">
                <BtnUserEdit onClick={() => editHandler(user)}>
                  수정
                </BtnUserEdit>
              </div>
            </Row>
          ))}
        </Body>
      </Table>

      <Pagination
        total={data.total_pages}
        current={currentPage}
        changeCurrent={pageHandler}
      />
      {openCreate && <CreateUserForm onClose={closeHanlder} />}
      {editUser && <EditUserForm userData={editUser} onClose={closeHanlder} />}
    </>
  );
};

export default Users;
