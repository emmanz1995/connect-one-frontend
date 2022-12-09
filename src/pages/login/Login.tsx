import React from 'react';
import { LoginContainer, LoginSection } from './style';
import LoginForm from '../../components/loginForm/LoginForm';

function Login() {
  return (
    <LoginContainer>
      <LoginSection>
        <LoginForm />
      </LoginSection>
    </LoginContainer>
  )
}

export default Login;