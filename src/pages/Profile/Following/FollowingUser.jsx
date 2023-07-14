import React from 'react';
import * as S from './FollowingUser.styled';
import StyledBtn from '../../../components/common/Button/Button';

export default function FollowingUser({
  size,
  userInfo,
  followHandler,
  myAccountName,
}) {
  // const [followingState, setFollowingState] = useState(
  //   type === 'follow' ? true : false,
  // );

  /* User컴포넌트를 여러곳에서 쓰고 싶을 때 if문 사용 */
  //   const button = () => {
  //     if(type === 'follow') {
  //       return (
  //         <StyledBtn
  //           size={'l'}
  //           width={100}
  //           color={type === 'follow' ? 'outline' : ''}
  //           onClick={}
  //           to={false}>
  //         {type === 'follow' ? '취소' : '팔로우'}
  //         </StyledBtn>
  //       )
  //     } else if(type === 'unfollow') {
  //       return (
  //        <StyledBtn />
  //       )
  //     }

  //   }

  return (
    <S.FollowingUserStyled>
      <S.FollowingUserImage
        size={size}
        src={userInfo.image}
        alt="사용자 이미지"
      />
      <S.FollowingUserTextBox>
        <S.FollowingUserName>{userInfo.username}</S.FollowingUserName>
        <S.FollowingUserIntro>{userInfo.intro}</S.FollowingUserIntro>
      </S.FollowingUserTextBox>

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
      {/* if문으로 컴포넌트 처리해야 할 때 쓰는 버튼 */}
      {/* {button()} */}
    </S.FollowingUserStyled>
  );
}
