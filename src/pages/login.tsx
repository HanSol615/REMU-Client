import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { InputField, PasswordInput } from '../components/InputField';
import LogoImg from '../assets/logo.png';
import styled from 'styled-components';

const Login: React.FC = () => {
  const { email, password, handleLogin, navigate } = useAuth();

  return (
    <Container>
      <LogoSection>
        <Logo src={LogoImg} alt="Logo" />
      </LogoSection>
      <Separator />
      <Form>
        <Title>로그인</Title>
        <InputField
          label="이메일"
          type="email"
          value={email.value}
          onChange={email.onChange}
          placeholder="이메일을 입력해주세요."
        />
        <PasswordInput
          label="비밀번호"
          value={password.value}
          onChange={password.onChange}
          placeholder="비밀번호를 입력해주세요."
        />
        <SubmitButton onClick={handleLogin}>로그인</SubmitButton>
        <Link onClick={() => navigate('/auth/join')}>회원 가입</Link>
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


const LogoSection = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
`;

const Logo = styled.img`
  width: 200px;
  height: auto;
`;

const Separator = styled.div`
  width: 1px;
  height: 100%;
  background-color: #ccc;
  margin: 0 20px;
`;

const Form = styled.div`
  width: 300px;
  margin: 0 20px 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  font-size: 2rem;
  font-weight: bold;
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
  margin-top: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

const Link = styled.div`
  margin-top: 10px;
  cursor: pointer;
  color: #007bff;
  text-align: right;
  text-decoration: underline;
`;

export default Login;