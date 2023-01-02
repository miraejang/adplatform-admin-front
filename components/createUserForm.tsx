import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BlueBtn, GrayBtn } from "../styles/buttons";
import {
  CloseBtn,
  Form,
  InputWrap,
  MaskingBtn,
  BtnBox,
  ErorrMessage,
  Icon,
} from "../styles/form";
import Modal from "./modal";

const sampleData = {
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

interface Iprops {
  onClose: () => void;
}
export interface UserForm {
  id: string;
  pw: string;
  pw_verify: string;
  name: string;
}

const CreateUserForm = ({ onClose }: Iprops) => {
  const [onPwMasking, setOnPwMasking] = useState(true);
  const [onVerifyMasking, setOnVerifyMasking] = useState(true);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<UserForm>({ mode: "onBlur" });
  const pw = getValues("pw");
  const onValid = (data: UserForm) => {
    console.log(data);
    onClose();
  };

  return (
    <Modal>
      <CloseBtn onClick={onClose}>
        <span>닫기</span>
      </CloseBtn>
      <h2>사용자 생성</h2>
      <Form onSubmit={handleSubmit(onValid)}>
        <div>
          <label htmlFor="id" className="required">
            <span>아이디</span>
          </label>
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
              validate: {
                idCheck: (value) =>
                  !sampleData.content.find((user) => value === user.email) ||
                  "이미 사용중인 이메일입니다. 다른 이메일을 입력하세요",
              },
            })}
            type="email"
            name="id"
            id="id"
          />
          {errors.id && <ErorrMessage>{errors.id.message}</ErorrMessage>}
        </div>
        <div>
          <label htmlFor="pw" className="required">
            <span>비밀번호</span>
          </label>
          <InputWrap>
            <input
              {...register("pw", {
                required: " 비밀번호를 입력하세요",
                pattern: {
                  value:
                    /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/,
                  message: "8~15자 영문, 숫자, 특수문자를 사용하세요.",
                },
              })}
              type={onPwMasking ? "password" : "text"}
              name="pw"
              id="pw"
              placeholder="영문, 숫자, 특수문자 조합 8~15자"
            />
            <MaskingBtn
              onClick={() => setOnPwMasking(!onPwMasking)}
              tabIndex={-1}
            >
              {onPwMasking && (
                <Icon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="100%"
                    viewBox="0 0 48 48"
                  >
                    <path d="M24 31.5q3.55 0 6.025-2.475Q32.5 26.55 32.5 23q0-3.55-2.475-6.025Q27.55 14.5 24 14.5q-3.55 0-6.025 2.475Q15.5 19.45 15.5 23q0 3.55 2.475 6.025Q20.45 31.5 24 31.5Zm0-2.9q-2.35 0-3.975-1.625T18.4 23q0-2.35 1.625-3.975T24 17.4q2.35 0 3.975 1.625T29.6 23q0 2.35-1.625 3.975T24 28.6Zm0 9.4q-7.3 0-13.2-4.15Q4.9 29.7 2 23q2.9-6.7 8.8-10.85Q16.7 8 24 8q7.3 0 13.2 4.15Q43.1 16.3 46 23q-2.9 6.7-8.8 10.85Q31.3 38 24 38Zm0-15Zm0 12q6.05 0 11.125-3.275T42.85 23q-2.65-5.45-7.725-8.725Q30.05 11 24 11t-11.125 3.275Q7.8 17.55 5.1 23q2.7 5.45 7.775 8.725Q17.95 35 24 35Z" />
                  </svg>
                </Icon>
              )}
              {!onPwMasking && (
                <Icon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="100%"
                    viewBox="0 0 48 48"
                  >
                    <path d="m31.45 27.05-2.2-2.2q1.3-3.55-1.35-5.9-2.65-2.35-5.75-1.2l-2.2-2.2q.85-.55 1.9-.8 1.05-.25 2.15-.25 3.55 0 6.025 2.475Q32.5 19.45 32.5 23q0 1.1-.275 2.175-.275 1.075-.775 1.875Zm6.45 6.45-2-2q2.45-1.8 4.275-4.025Q42 25.25 42.85 23q-2.5-5.55-7.5-8.775Q30.35 11 24.5 11q-2.1 0-4.3.4-2.2.4-3.45.95L14.45 10q1.75-.8 4.475-1.4Q21.65 8 24.25 8q7.15 0 13.075 4.075Q43.25 16.15 46 23q-1.3 3.2-3.35 5.85-2.05 2.65-4.75 4.65Zm2.9 11.3-8.4-8.25q-1.75.7-3.95 1.075T24 38q-7.3 0-13.25-4.075T2 23q1-2.6 2.775-5.075T9.1 13.2L2.8 6.9l2.1-2.15L42.75 42.6ZM11.15 15.3q-1.85 1.35-3.575 3.55Q5.85 21.05 5.1 23q2.55 5.55 7.675 8.775Q17.9 35 24.4 35q1.65 0 3.25-.2t2.4-.6l-3.2-3.2q-.55.25-1.35.375T24 31.5q-3.5 0-6-2.45T15.5 23q0-.75.125-1.5T16 20.15Zm15.25 7.1Zm-5.8 2.9Z" />
                  </svg>
                </Icon>
              )}
            </MaskingBtn>
          </InputWrap>
          {errors.pw && <ErorrMessage>{errors.pw.message}</ErorrMessage>}
        </div>
        <div>
          <label htmlFor="pw_verify" className="required">
            <span>비밀번호 확인</span>
          </label>
          <InputWrap>
            <input
              {...register("pw_verify", {
                required: "비밀번호를 입력하세요",
                validate: {
                  verify: (value) =>
                    value === pw || "비밀번호가 일치하지 않습니다.",
                },
              })}
              type={onVerifyMasking ? "password" : "text"}
              name="pw_verify"
              id="pw_verify"
            />
            <MaskingBtn
              onClick={() => setOnVerifyMasking(!onVerifyMasking)}
              tabIndex={-1}
            >
              {onVerifyMasking && (
                <Icon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="100%"
                    viewBox="0 0 48 48"
                  >
                    <path d="M24 31.5q3.55 0 6.025-2.475Q32.5 26.55 32.5 23q0-3.55-2.475-6.025Q27.55 14.5 24 14.5q-3.55 0-6.025 2.475Q15.5 19.45 15.5 23q0 3.55 2.475 6.025Q20.45 31.5 24 31.5Zm0-2.9q-2.35 0-3.975-1.625T18.4 23q0-2.35 1.625-3.975T24 17.4q2.35 0 3.975 1.625T29.6 23q0 2.35-1.625 3.975T24 28.6Zm0 9.4q-7.3 0-13.2-4.15Q4.9 29.7 2 23q2.9-6.7 8.8-10.85Q16.7 8 24 8q7.3 0 13.2 4.15Q43.1 16.3 46 23q-2.9 6.7-8.8 10.85Q31.3 38 24 38Zm0-15Zm0 12q6.05 0 11.125-3.275T42.85 23q-2.65-5.45-7.725-8.725Q30.05 11 24 11t-11.125 3.275Q7.8 17.55 5.1 23q2.7 5.45 7.775 8.725Q17.95 35 24 35Z" />
                  </svg>
                </Icon>
              )}
              {!onVerifyMasking && (
                <Icon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="100%"
                    viewBox="0 0 48 48"
                  >
                    <path d="m31.45 27.05-2.2-2.2q1.3-3.55-1.35-5.9-2.65-2.35-5.75-1.2l-2.2-2.2q.85-.55 1.9-.8 1.05-.25 2.15-.25 3.55 0 6.025 2.475Q32.5 19.45 32.5 23q0 1.1-.275 2.175-.275 1.075-.775 1.875Zm6.45 6.45-2-2q2.45-1.8 4.275-4.025Q42 25.25 42.85 23q-2.5-5.55-7.5-8.775Q30.35 11 24.5 11q-2.1 0-4.3.4-2.2.4-3.45.95L14.45 10q1.75-.8 4.475-1.4Q21.65 8 24.25 8q7.15 0 13.075 4.075Q43.25 16.15 46 23q-1.3 3.2-3.35 5.85-2.05 2.65-4.75 4.65Zm2.9 11.3-8.4-8.25q-1.75.7-3.95 1.075T24 38q-7.3 0-13.25-4.075T2 23q1-2.6 2.775-5.075T9.1 13.2L2.8 6.9l2.1-2.15L42.75 42.6ZM11.15 15.3q-1.85 1.35-3.575 3.55Q5.85 21.05 5.1 23q2.55 5.55 7.675 8.775Q17.9 35 24.4 35q1.65 0 3.25-.2t2.4-.6l-3.2-3.2q-.55.25-1.35.375T24 31.5q-3.5 0-6-2.45T15.5 23q0-.75.125-1.5T16 20.15Zm15.25 7.1Zm-5.8 2.9Z" />
                  </svg>
                </Icon>
              )}
            </MaskingBtn>
          </InputWrap>
          {errors.pw_verify && (
            <ErorrMessage>{errors.pw_verify.message}</ErorrMessage>
          )}
        </div>
        <div>
          <label htmlFor="name" className="required">
            <span>이름</span>
          </label>
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
          {errors.name && <ErorrMessage>{errors.name.message}</ErorrMessage>}
        </div>
        <BtnBox>
          <GrayBtn onClick={onClose}>취소</GrayBtn>
          <BlueBtn>생성</BlueBtn>
        </BtnBox>
      </Form>
    </Modal>
  );
};

export default CreateUserForm;
