import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { loginState } from '../../../recoil/atoms/loginState';
import { recoilData } from '../../../recoil/atoms/dataState';
import { instance } from '../../../util/api/axiosInstance';
import {
  LoginPageWrap,
  PageH2,
  TextInputBox,
  LoginCreateAccount,
  ErrorMessage,
} from './Login.styled';
import TextActiveInput from '../../../components/common/TextActiveInput/TextActiveInput';
import StyledBtn from '../../../components/common/Button/Button';

export default function LoginPage() {
  const navigate = useNavigate();
  const setCurrentUSerToken = useSetRecoilState(loginState);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailAlertMessage, setEmailAlertMessage] = useState('');
  const [passwordAlertMessage, setPasswordAlertMessage] = useState('');
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(true);
  const [isEmailInvalid, setEmailInvalid] = useState(true);
  const setCurrentUserData = useSetRecoilState(recoilData);
  const emailRegEx = /^[a-zA-Z0-9+_.-]+@[a-z0-9.-]+\.[a-z0-9.-]+$/;

  const handleEmailChange = (e) => {
    const currentEmail = e.target.value.trim();
    setEmail(currentEmail);

    // 이메일 유효성 검사
    if (email === '') {
      setEmailInvalid(true);
      setEmailAlertMessage('*이메일을 입력해주세요');
    } else {
      passwordAlertMessage !== ''
        ? setIsPasswordInvalid(false)
        : setIsPasswordInvalid(true);
      setEmailInvalid(false);
      setEmailAlertMessage('');
    }
  };

  const handlePasswordChange = (e) => {
    const currentPassword = e.target.value.trim();
    setPassword(currentPassword);

    // 패스워드 유효성 검사
    if (password.length < 1) {
      setIsPasswordInvalid(true);
      setPasswordAlertMessage('*비밀번호를 입력해주세요.');
    } else {
      setIsPasswordInvalid(false);
      setPasswordAlertMessage('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 이메일 유효성 검사
      if (!emailRegEx.test(email)) {
        setEmailInvalid(true);
        setEmailAlertMessage('*유효하지 않은 이메일입니다.');
      } else {
        setEmailInvalid(false);
        setEmailAlertMessage('');
      }

      // 패스워드 유효성 검사
      if (password.length < 6) {
        setIsPasswordInvalid(true);
        setPasswordAlertMessage('*비밀번호는 6자 이상이어야 합니다.');
      } else {
        setIsPasswordInvalid(false);
        setPasswordAlertMessage('');
      }

      if (isEmailInvalid || isPasswordInvalid) return;

      // api 통신
      const user = JSON.stringify({
        user: {
          email: email,
          password: password,
        },
      });

      // 비동기 통신
      const res = await instance.post('/user/login', user, {
        headers: { 'Content-type': 'application/json' },
      });
      console.log(res);

      if (!res.data.message) {
        //localStorage 저장
        const userToken = res.data.user['token'];
        setCurrentUSerToken(userToken);

        // recoil state
        setCurrentUserData(res.data.user);

        console.log('로그인 성공!');

        navigate('/home');
      } else {
        setIsPasswordInvalid(true);
        password.length < 6
          ? setPasswordAlertMessage(`*비밀번호는 6자 이상이어야 합니다.`)
          : setPasswordAlertMessage(`*${res.data.message}`);
      }
    } catch (error) {
      console.error(error);
      alert(`${error.response.data.message}`);
    }
  };

  return (
    <LoginPageWrap>
      <PageH2>로그인</PageH2>
      <TextInputBox onSubmit={handleSubmit}>
        <TextActiveInput
          // type="email"
          placeholder="이메일을 입력해주세요"
          value={email}
          onChange={handleEmailChange}
        >
          이메일
        </TextActiveInput>
        {isEmailInvalid && <ErrorMessage>{emailAlertMessage}</ErrorMessage>}
        <TextActiveInput
          type="password"
          placeholder="비밀번호를 입력해주세요"
          value={password}
          onChange={handlePasswordChange}
        >
          비밀번호
        </TextActiveInput>
        {isPasswordInvalid && (
          <ErrorMessage>{passwordAlertMessage}</ErrorMessage>
        )}
        {/* {isPasswordInvalid && (
          <ErrorMessage>{responseAlertMessage}</ErrorMessage>
        )} */}
        <StyledBtn type="submit" disabled={isEmailInvalid || isPasswordInvalid}>
          로그인
        </StyledBtn>
      </TextInputBox>
      <LoginCreateAccount href="#">이메일로 회원가입</LoginCreateAccount>
    </LoginPageWrap>
  );
}
