import React from "react";
import { useForm } from "react-hook-form";
import { BlueBtn, GrayBtn } from "../styles/buttons";
import { Form, CloseBtn, ErorrMessage, BtnBox } from "../styles/form";
import Modal from "./modal";

type User = {
  email: string;
  name: string;
};

interface Iprops {
  userData: User;
  onClose: () => void;
}

const EditUserForm = ({ userData, onClose }: Iprops) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({ mode: "onBlur" });
  const onValid = ({ name }: User) => {
    console.log({ ...userData, name });
    onClose();
  };

  return (
    <Modal>
      <CloseBtn onClick={onClose}>
        <span>닫기</span>
      </CloseBtn>
      <h2>사용자 수정</h2>
      <Form onSubmit={handleSubmit(onValid)}>
        <div>
          <div className="labelStyleBox required">
            <span>아이디</span>
          </div>
          <div className="inputStyleBox">
            <p>{userData.email}</p>
          </div>
        </div>
        <div>
          <label htmlFor="name" className="required">
            <span>이름</span>
          </label>
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

export default EditUserForm;
