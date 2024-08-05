import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import styled from 'styled-components';
import { InputFieldProps, PasswordInputProps } from '../models/inputField.model';

const InputField: React.FC<InputFieldProps> = ({ label, type, value, onChange, placeholder }) => {
  return (
    <InputWrapper>
      <label>{label}</label>
      <input type={type} value={value} onChange={onChange} placeholder={placeholder} />
    </InputWrapper>
  );
};

const PasswordInput: React.FC<PasswordInputProps> = ({ label, value, onChange, placeholder, error }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
      <InputWrapper>
        <label>{label}</label>
        <input
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
        <ToggleButton onClick={toggleShowPassword}>
          {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </ToggleButton>
        {error && <ErrorText>{error}</ErrorText>}
      </InputWrapper>
  );
};

const InputWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-bottom: 10px;
  position: relative;

  label {
    margin-bottom: 5px;
  }

  input {
    padding: 10px;
    padding-right: 40px; /* 공간을 만들기 위해 padding-right 추가 */
    border: 1px solid #ccc;
    border-radius: 5px;
  }
`;

const ToggleButton = styled.div`
  position: absolute;
  right: 10px;
  top: 50%;
  cursor: pointer;
  color: #6c757d;
`;

const ErrorText = styled.div`
  color: red;
  margin-top: 5px;
`;

export {
  InputField,
  PasswordInput
};