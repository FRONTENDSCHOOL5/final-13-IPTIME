import React, { useState, useEffect } from 'react';
import TopBasicNav from '../../../components/common/Top/TopBasicNav';
import FollowingUser from './FollowingUser';
import TabMenu from '../../../components/common/Tabmenu/TabMenu';
import { Link } from 'react-router-dom';
import { UserWrapper } from './Following.styled';
import { instance } from '../../../util/api/axiosInstance';
import { useLocation } from 'react-router-dom';
import { loginState } from '../../../recoil/atoms/loginState';
import { useRecoilValue } from 'recoil';

export default function Following() {
  // 내가 follow 하는 사람들의 list를 저장할 state
  const [following, setFollowing] = useState([]);

  const location = useLocation();
  const { accountName, myAccountName } = location.state;
  // const token = localStorage.getItem('token');

  const token = useRecoilValue(loginState);
  console.log(token);
  // useEffect(콜백함수, 의존성 배열)
  // 의존성 배열의 요소가 변경되면 콜백함수 실행
  useEffect(() => {
    getFollowing();
  }, []);

  /* 
    2. 버튼 눌렀을 때 getFollowers 가 실행이 되고 서버와 통신해서 setFollowers에 나를 팔로우한 사람들의 데이터를 넣는다.
    그렇게 되면 빈 배열이 아니라 값이 채워지게 되고, 아래 return 문으로 가게 되면
  */
  const getFollowing = async () => {
    const res = await instance.get(
      `https://api.mandarin.weniv.co.kr/profile/${accountName}/following`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
      },
    );

    setFollowing(res.data);
  };

  // FollowerUser.jsx에서 넘겨받은 userInfo(내가 팔로우 하는 사람의 정보)를 params로 넣는다
  const followHandler = async (userInfo) => {
    try {
      /**
       * params로 넘겨받은 userInfo에 isfollow(내가 팔로우를 하는지에 대한 유무)가 true일 경우
       * 해당 userInfo에 있는 accountname을 언팔로우 api의 params로 보내 언팔로우를 진행한다
       */
      if (userInfo.isfollow) {
        await instance.delete(`/profile/${userInfo.accountname}/unfollow`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-type': 'application/json',
          },
        });

        //데이터 재조회 => 언팔로우가 끝났으니 getFollower 함수를 실행시켜 팔로우 재조회
        getFollowing();

        // 넘겨받은 userInfo에 isFollow가 false일 경우 팔로우 api에 accountname을 보내 팔로우 처리
      } else {
        await instance.post(
          `/profile/${userInfo.accountname}/follow`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-type': 'application/json',
            },
          },
        );

        // 데이터 재조회 => 팔로우가 끝났으니 getFollowing 함수를 실행히켜 팔로우 재조회
        getFollowing();
        console.log('팔로우 성공');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <TopBasicNav>Followings</TopBasicNav>
      <UserWrapper>
        {/* 3. 이곳에 useState에 채워져있는 배열이 map으로 뿌려지게 되고, 빈 화면이 아니라 유저들의 정보가 화면에 뿌려지게 된다. */}
        {following.map((user) => {
          return (
            <li key={user._id}>
              <Link
                to={`/profile/${user.accountname}`}
                state={{ userId: user.accountname }}
              >
                <FollowingUser
                  userInfo={user} // 내가 팔로우 하는 사람들 각각의 정보를 넘김
                  followHandler={followHandler}
                  size={'small'}
                  myAccountName={myAccountName}
                />
              </Link>
            </li>
          );
        })}
      </UserWrapper>
      <TabMenu></TabMenu>
    </>
  );
}
