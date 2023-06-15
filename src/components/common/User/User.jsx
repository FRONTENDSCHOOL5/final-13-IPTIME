import React from 'react';
import * as S from './User.styled';
import defaultProfileImg from '../../../assets/img/basic-profile.svg';

export default function User({size, userName, userId, userImg, type }) {
  return (
    <S.UserStyled>
      <S.UserImage size={size} src={userImg || defaultProfileImg} alt="사용자 이미지" />
      <S.UserDetails>
        <S.UserName>{userName}</S.UserName>
        <S.UserId>@ {userId}</S.UserId>
      </S.UserDetails>
      {type === 'follow' && <button>팔로우</button>}
    </S.UserStyled>
  );
}