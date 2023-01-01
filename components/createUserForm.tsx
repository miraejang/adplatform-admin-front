import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { BlueBtn, GrayBtn } from "../styles/buttons";
import Modal from "./modal";

interface Iprops {
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

const CreateUserForm = (props: Iprops) => {
  const { register } = useForm();
  const [onMasking, setOnMasking] = useState(true);

  return (
    <Modal onClose={props.onClose}>
      <button onClick={props.onClose}>
        <p>닫기</p>
      </button>
      <h2>사용자 생성</h2>
      <Form>
        <label htmlFor="id">아이디</label>
        <input {...register} type="email" name="id" id="id" />
        <label htmlFor="pw">비밀번호</label>
        <div>
          <input
            {...register}
            type="password"
            name="pw"
            id="pw"
            placeholder="영문, 숫자, 특수문자 조합 8~15자"
          />
          <button>masking</button>
        </div>
        <label htmlFor="pw_verify">비밀번호 확인</label>
        <div>
          <input
            {...register}
            type={onMasking ? "password" : "text"}
            name="pw_verify"
            id="pw_verify"
          />
          <button onClick={() => setOnMasking(!onMasking)}>masking</button>
        </div>
        <label htmlFor="name">이름</label>
        <input {...register} type="text" name="name" id="name" />
        <BtnBox>
          <GrayBtn onClick={props.onClose}>취소</GrayBtn>
          <BlueBtn>생성</BlueBtn>
        </BtnBox>
      </Form>
    </Modal>
  );
};

export default CreateUserForm;
