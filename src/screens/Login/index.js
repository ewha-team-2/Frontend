import React, { useState } from 'react';
import axios from 'axios';
import './styles.js';
import { Container, LoginButton, Logo, GoogleLogo } from './styles.js';
import googleLogo from './components/google-logo.png'; 

const Login = ({ login }) => {
  const handleLogin = async () => {
    try {
        // Google 로그인 페이지로 리디렉션
        window.location.href = 'http://localhost:5000/auth/google';
    } catch (error) {
        console.error('로그인 오류:', error);
    }
  };
    
      return (
        <Container>
          <Logo>TripGoing</Logo>
          <GoogleLogo>
            <img src={googleLogo} alt="Google Logo" className="google-logo-image" />
          </GoogleLogo>
          <LoginButton onClick={handleLogin}>
            구글로 로그인하기
          </LoginButton>
        </Container>
      );
};

export default Login;