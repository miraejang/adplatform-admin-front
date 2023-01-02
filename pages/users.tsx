import React, { useState } from "react";
import styled from "styled-components";
import CreateUserForm from "../components/createUserForm";
import EditUserForm from "../components/editUserForm";
import Pagination from "../components/pagination";
import { BlueBtn } from "../styles/buttons";
import { Body, Head, Row, Table } from "../styles/table";

type User = {
  id: number;
  email: string;
  name: string;
  last_login_at: string;
};
interface IUsers {
  content: User[];
  total_elements: number;
  total_pages: number;
  last: boolean;
  number: number;
  size: number;
  sort: object;
  number_of_elements: number;
  first: boolean;
  empty: boolean;
}

const BtnUserCreat = styled(BlueBtn)`
  margin: 1rem 2rem 1.5rem;
`;
const BtnUserEdit = styled.button`
  padding: 0;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.pointBlue};
`;

const Users = ({ results }: IUsers) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [openCreate, setOpenCreate] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);

  const pageHandler = (page: number) => {
    setCurrentPage(page);
  };
  const editHandler = (results: User) => {
    setEditUser(results);
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
          {results.content.map((user: User) => (
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
        total={results.total_pages}
        current={currentPage}
        changeCurrent={pageHandler}
      />
      {openCreate && <CreateUserForm onClose={closeHanlder} />}
      {editUser && <EditUserForm userData={editUser} onClose={closeHanlder} />}
    </>
  );
};

export default Users;

export async function getServerSideProps() {
  const results = await (await fetch(`http://localhost:3000/api/users`)).json();

  return {
    props: { results },
  };
}
