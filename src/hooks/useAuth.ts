// src/hooks/useAuth.ts
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { join, login } from '../services/api'; // login 함수도 가져옴
import { validatePassword } from '../utils/validation';
import useInput from '../hooks/useInput';

export const useAuth = () => {
  const navigate = useNavigate();
  const nickname = useInput('');
  const email = useInput('');
  const password = useInput('');
  const passwordConfirm = useInput('');

  const [errors, setErrors] = useState({
    nickname: '',
    email: '',
    password: '',
    passwordConfirm: ''
  });

  const handleJoin = async () => {
    let hasError = false;

    setErrors({ nickname: '', email: '', password: '', passwordConfirm: '' });

    if (!nickname.value || !email.value || !password.value || !passwordConfirm.value) {
      alert('공백이 있습니다.');
      return;
    }

    if (!validatePassword(password.value)) {
      setErrors((prev) => ({ ...prev, password: '영문자, 숫자, 특수문자 포함 8~20자 이내로 입력하세요.' }));
      hasError = true;
    }

    if (password.value !== passwordConfirm.value) {
      setErrors((prev) => ({ ...prev, passwordConfirm: '비밀번호가 일치하지 않습니다.' }));
      hasError = true;
    }

    if (hasError) {
      return;
    }

    try {
      const response = await join({ nickname: nickname.value, email: email.value, password: password.value });
      alert(response.message);
      navigate('/auth/login');
    } catch (error) {
      console.error('회원가입 실패:', error);
      alert('회원가입 중 오류가 발생했습니다.');
    }
  };

  const handleLogin = async () => {
    if (!email.value || !password.value) {
      alert('공백이 있습니다.');
      return;
    }

    try {
      const response = await login({ email: email.value, password: password.value });

      if (response.accessToken) {
        localStorage.setItem('accessToken', response.accessToken);
      }

      alert(response.message);
      navigate('/main');
    } catch (error: any) {
      const errorMessage = error.response?.data?.message;
      alert(errorMessage);
      console.error('로그인 실패:', error);
    }
  };

  return { nickname, email, password, passwordConfirm, errors, handleJoin, handleLogin, navigate };
};