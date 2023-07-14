import React from 'react';
import * as S from './FollowerUser.styled';
import StyledBtn from '../../../components/common/Button/Button';

export default function FollowerUser({
  size,
  userInfo,
  followHandler,
  myAccountName,
}) {
  return (
    <S.FollowerUserStyled>
      <S.FollowerUserImage
        size={size}
        src={userInfo.image}
        alt="사용자 이미지"
      />
      <S.FollowerUserTextBox>
        <S.FollowerUserName>{userInfo.username}</S.FollowerUserName>
        <S.FollowerUserIntro>{userInfo.intro}</S.FollowerUserIntro>
      </S.FollowerUserTextBox>

      <S.BtnBox>
        {userInfo.accountname !== myAccountName && (
          <StyledBtn
            size={'s'}
            width={'10'}
            color={userInfo.isfollow === true ? 'outline' : ''}
            onClick={() => followHandler(userInfo)}
            to={false}
          >
            {userInfo.isfollow === true ? '취소' : '팔로우'}
          </StyledBtn>
        )}
      </S.BtnBox>
    </S.FollowerUserStyled>
  );
}
