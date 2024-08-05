// pages/Join.tsx
import React from 'react';
import { InputField, PasswordInput } from '../components/InputField';
import { useAuth } from '../hooks/useAuth';
import styled from 'styled-components';

const Join: React.FC = () => {
  const { nickname, email, password, passwordConfirm, errors, handleJoin, navigate } = useAuth();

  return (
    <Container>
      <Form>
        <Title>회원 가입</Title>
        <InputField
          label="닉네임"
          type="text"
          value={nickname.value}
          onChange={nickname.onChange}
          placeholder='닉네임을 입력해주세요.' />
        <InputField
          label="이메일"
          type="email"
          value={email.value}
          onChange={email.onChange}
          placeholder='이메일을 입력해주세요.' />
        <PasswordInput
          label="비밀번호"
          value={password.value}
          onChange={password.onChange}
          error={errors.password}
          placeholder='비밀번호를 입력해주세요.' />
        <PasswordInput
          label="비밀번호 확인"
          value={passwordConfirm.value}
          onChange={passwordConfirm.onChange}
          error={errors.passwordConfirm}
          placeholder='비밀번호를 확인해주세요.'
        />
        <Link onClick={() => navigate('/auth/login')}>이미 회원이신가요?</Link>
        <SubmitButton onClick={handleJoin}>가입하기</SubmitButton>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 800px;
  height: 500px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  align-items: center;
`;


const Form = styled.div`
  width: 300px;
  margin: 0 auto;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  font-size: 2rem;
  font-weight: bold;
`;


const Link = styled.div`
  margin-bottom: 10px;
  text-align: right;
  cursor: pointer;
  color: #007bff;
  text-decoration: underline;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;

export default Join;