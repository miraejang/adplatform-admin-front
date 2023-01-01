import React from "react";
import { FieldErrors, useForm } from "react-hook-form";
import styled from "styled-components";
import { BlueBtn, GrayBtn } from "../styles/buttons";
import Modal from "./modal";

type User = {
  email: string;
  name: string;
};

interface Iprops {
  userData: User;
  onClose: () => void;
}

const Form = styled.form`
  margin-top: 1rem;
`;
const BtnBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EditUserForm = ({ userData, onClose }: Iprops) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({ mode: "onBlur" });
  const onValid = (data: User) => {};
  const OnInvalid = (errors: FieldErrors) => {};

  return (
    <Modal onClose={onClose}>
      <button onClick={onClose}>
        <p>닫기</p>
      </button>
      <h2>사용자 수정</h2>
      <Form onSubmit={handleSubmit(onValid, OnInvalid)}>
        <div>
          <p>아이디</p>
          <p>{userData.email}</p>
        </div>
        <div>
          <label htmlFor="name">이름</label>
          <input
            defaultValue={userData.name}
            {...register("name", {
              required: "이름을 입력하세요.",
              pattern: {
                value: /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]{1,16}$/,
                message:
                  "이름을 올바르게 입력하세요. (숫자, 특수문자, 공백 입력 불가)",
              },
            })}
            type="text"
            name="name"
            id="name"
          />
          {errors.name?.message}
        </div>
        <BtnBox>
          <GrayBtn onClick={onClose}>취소</GrayBtn>
          <BlueBtn>생성</BlueBtn>
        </BtnBox>
      </Form>
    </Modal>
  );
};

export default EditUserForm;
