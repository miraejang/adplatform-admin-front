import styled from "styled-components";
import Pagination from "../components/pagination";

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

const Users = () => {
  const dateFormat = (str: string) => {
    const date = new Date(str);
    const dateString = date
      .toLocaleDateString("ko-KR")
      .replaceAll(/\. /g, "-")
      .replace(/\.$/, "");
    const timeString = date.toLocaleTimeString("en-GB");
    return `${dateString} ${timeString}`;
  };

  const BtnUserCreat = styled.button`
    padding: 0.5rem;
    margin: 1rem 2rem 1.5rem;
    border-radius: 0.5rem;
    background-color: ${({ theme }) => theme.colors.pointBlue};
    color: #fff;
  `;
  const BtnUserEdit = styled.button`
    padding: 0;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.pointBlue};
  `;

  return (
    <>
      <h1>사용자 관리</h1>
      <BtnUserCreat>생성</BtnUserCreat>
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
                <BtnUserEdit>수정</BtnUserEdit>
              </div>
            </Row>
          ))}
        </Body>
      </Table>
      <Pagination />
    </>
  );
};

export default Users;
