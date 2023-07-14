import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import TopBasicNav from '../../../components/common/Top/TopBasicNav';
import ProductItem from '../../../components/common/ProductItem/ProductItem';
import PostItem from '../../../components/common/PostItem/PostItem';
import TabMenu from '../../../components/common/Tabmenu/TabMenu';
import StyledBtn from '../../../components/common/Button/Button';

import { instance } from '../../../util/api/axiosInstance';
import useScrollBottom from '../../../hooks/useScrollBottom';

import * as S from './ProfileDetail.styled';

import { useRecoilValue } from 'recoil';
import { recoilData } from '../../../recoil/atoms/dataState';
import { loginState } from '../../../recoil/atoms/loginState';

export default function Profile() {
  const [profile, setProfile] = useState({});
  const [products, setProducts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [view, setView] = useState('list');
  const [skip, setSkip] = useState(0);
  const { accountname } = useParams();

  const currentUserData = useRecoilValue(recoilData);
  const token = useRecoilValue(loginState);

  const location = useLocation();

  const accountName =
    location.state !== null
      ? location.state.userId
      : currentUserData.accountname;

  const myAccountName = currentUserData.accountname;

  const loadProfile = async (accName) => {
    try {
      const res = await instance.get(`/profile/${accName}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
      });
      setProfile(res.data.profile);
    } catch (error) {
      console.error(error);
      alert(`${error.response.data.message}`);
    }
  };

  const loadProduct = async (accName) => {
    try {
      const res = await instance.get(`/product/${accName}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
      });
      setProducts(res.data.product);
    } catch (error) {
      console.error(error);
      alert(`${error.response.data.message}`);
    }
  };

  const loadPost = async (accName, changeUser = false) => {
    try {
      const res = await instance.get(
        `/post/${accName}/userpost/?limit=5&skip=${skip}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-type': 'application/json',
          },
        },
      );
      if (changeUser) {
        setPosts(res.data.post);
      } else {
        setPosts([...posts, ...res.data.post]);
      }
    } catch (error) {
      console.error(error);
      alert(`${error.response.data.message}`);
    }
  };
  console.log(posts);

  const followHandler = async () => {
    try {
      if (profile.isfollow) {
        const res = await instance.delete(`/profile/${accountName}/unfollow`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-type': 'application/json',
          },
        });
        setProfile(res.data.profile);
      } else {
        const res = await instance.post(
          `/profile/${accountName}/follow`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-type': 'application/json',
            },
          },
        );
        setProfile(res.data.profile);
      }
    } catch (error) {
      console.error(error);
      alert(`${error.response.data.message}`);
    }
  };

  useEffect(() => {
    loadProfile(accountName);
    loadProduct(accountName);
    loadPost(accountName, true);
  }, [accountName]);

  // 무한 스크롤
  const isBottom = useScrollBottom();
  useEffect(() => {
    if (isBottom) {
      setSkip((prev) => prev + 5);
    }
  }, [isBottom]);
  useEffect(() => {
    loadPost(accountName);
  }, [skip]);

  const deletePost = async (postId) => {
    try {
      await instance.delete(`/post/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
      });
      const res = await instance.get(
        `/post/${accountName}/userpost/?limit=${skip}&skip=0`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-type': 'application/json',
          },
        },
      );
      setPosts(res.data.post);
    } catch (error) {
      console.error(error);
      alert(`${error.response.data.message}`);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await instance.delete(`/product/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
      });
      loadProduct(accountName);
    } catch (error) {
      console.error(error);
      alert(`${error.response.data.message}`);
    }
  };

  return (
    <>
      <TopBasicNav />
      <S.Container>
        <S.ProfileSection>
          <S.ProfileWrap>
            <S.followLink
              to="/follower"
              state={{
                accountName: profile.accountname,
                myAccountName: myAccountName,
              }}
            >
              <p>{profile.followerCount}</p>
              <p>followers</p>
            </S.followLink>
            <S.ProfileImg src={profile.image} alt="프로필 사진" />
            <S.followLink
              to="/following"
              state={{
                accountName: profile.accountname,
                myAccountName: myAccountName,
              }}
            >
              <p>{profile.followingCount}</p>
              <p>followings</p>
            </S.followLink>
          </S.ProfileWrap>
          <S.UserName>{profile.username}</S.UserName>
          <S.UserId>@ {profile.accountname}</S.UserId>
          <S.UserIntro>{profile.intro}</S.UserIntro>
          {myAccountName === accountname ? (
            <S.UserBtnWrap>
              <StyledBtn to="/profile/edit" size="m" color="outline">
                프로필 수정
              </StyledBtn>
              <StyledBtn to="/productupload" size="m" color="outline">
                상품 등록
              </StyledBtn>
            </S.UserBtnWrap>
          ) : (
            <S.UserBtnWrap>
              <S.messageButton to={`/chatlist/${accountname}`} />
              <StyledBtn
                size="m"
                color={profile.isfollow ? 'outlineGrey' : 'fill'}
                onClick={followHandler}
              >
                {profile.isfollow ? '언팔로우' : '팔로우'}
              </StyledBtn>
              <S.shareButton />
            </S.UserBtnWrap>
          )}
        </S.ProfileSection>
        {products.length > 0 && (
          <S.ProductSection>
            <S.StyledH2>판매 중인 상품</S.StyledH2>
            <S.ProductList>
              {products.map((product) => {
                return (
                  <li key={product.id}>
                    <ProductItem
                      productId={product.id}
                      accountname={product.author.accountname}
                      itemName={product.itemName}
                      price={product.price}
                      itemImg={product.itemImage}
                      onDelete={() => deleteProduct(product.id)}
                      link={product.link}
                    />
                  </li>
                );
              })}
            </S.ProductList>
          </S.ProductSection>
        )}
        {posts.length > 0 && (
          <S.PostSection>
            <S.PostTop>
              <S.viewButton
                view={view}
                type="button"
                onClick={() => setView('list')}
              ></S.viewButton>
              <S.viewButton
                view={view}
                type="button"
                onClick={() => setView('album')}
              ></S.viewButton>
            </S.PostTop>
            <S.PostList view={view}>
              {posts.map((post) => {
                return view === 'list' ? (
                  <li key={post.accountname}>
                    <PostItem
                      postId={post.id}
                      postDate={post.createdAt}
                      postImg={post.image}
                      postLike={post.heartCount}
                      postMessage={post.commentCount}
                      postText={post.content}
                      userId={post.author.accountname}
                      userImg={profile.image}
                      userName={post.author.username}
                      onDeletePost={() => deletePost(post.id)}
                    />
                  </li>
                ) : (
                  post.image && (
                    <li key={post.accountname}>
                      <S.AlbumImg src={post.image} alt="" />
                    </li>
                  )
                );
              })}
            </S.PostList>
          </S.PostSection>
        )}
      </S.Container>
      <TabMenu />
    </>
  );
}
