import React, { useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";
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
export interface UserForm {
  id: string;
  pw: string;
  pw_verify: string;
  name: string;
}

const CreateUserForm = (props: Iprops) => {
  const [onMasking, setOnMasking] = useState(true);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<UserForm>({ mode: "onBlur" });
  const pw = getValues("pw");
  const onValid = (data: UserForm) => {};
  const OnInvalid = (errors: FieldErrors) => {};

  return (
    <Modal onClose={props.onClose}>
      <button onClick={props.onClose}>
        <p>닫기</p>
      </button>
      <h2>사용자 생성</h2>
      <Form onSubmit={handleSubmit(onValid, OnInvalid)}>
        <div>
          <label htmlFor="id">아이디</label>
          <input
            {...register("id", {
              required: "아이디(이메일)을 입력하세요.",
              pattern: {
                value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                message: "올바른 이메일 주소를 입력하세요.",
              },
              minLength: {
                value: 9,
                message: "올바른 이메일 주소를 입력하세요.",
              },
              maxLength: {
                value: 50,
                message: "올바른 이메일 주소를 입력하세요.",
              },
              // validate
            })}
            type="email"
            name="id"
            id="id"
          />
          {errors.id?.message}
        </div>

        <div>
          <label htmlFor="pw">비밀번호</label>
          <div>
            <input
              {...register("pw", {
                required: " 비밀번호를 입력하세요",
                pattern: {
                  value:
                    /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/,
                  message: "8~15자 영문, 숫자, 특수문자를 사용하세요.",
                },
              })}
              type={onMasking ? "password" : "text"}
              name="pw"
              id="pw"
              placeholder="영문, 숫자, 특수문자 조합 8~15자"
            />
            <button onClick={() => setOnMasking(!onMasking)} tabIndex={-1}>
              masking
            </button>
          </div>
          {errors.pw?.message}
        </div>

        <div>
          <label htmlFor="pw_verify">비밀번호 확인</label>
          <div>
            <input
              {...register("pw_verify", {
                required: "비밀번호를 입력하세요",
                validate: {
                  verify: (value) =>
                    value === pw || "비밀번호가 일치하지 않습니다.",
                },
              })}
              type={onMasking ? "password" : "text"}
              name="pw_verify"
              id="pw_verify"
            />
            <button onClick={() => setOnMasking(!onMasking)} tabIndex={-1}>
              masking
            </button>
          </div>
          {errors.pw_verify?.message}
        </div>

        <div>
          <label htmlFor="name">이름</label>
          <input
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
          <GrayBtn onClick={props.onClose}>취소</GrayBtn>
          <BlueBtn>생성</BlueBtn>
        </BtnBox>
      </Form>
    </Modal>
  );
};

export default CreateUserForm;
