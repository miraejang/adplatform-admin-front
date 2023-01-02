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
import { HideIcon, ShowIcon } from "../styles/icons";
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
              type="button"
              onClick={() => setOnPwMasking(!onPwMasking)}
              tabIndex={-1}
            >
              {onPwMasking ? <ShowIcon /> : <HideIcon />}
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
              type="button"
              onClick={() => setOnVerifyMasking(!onVerifyMasking)}
              tabIndex={-1}
            >
              {onVerifyMasking ? <ShowIcon /> : <HideIcon />}
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
