import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TopDiv,
  ArrowLeftBtn,
  OptionBtn,
  ArrowLeftBtnText,
} from '../Top/TopBasicNav.styled';

export default function TopBasicNav({ children, onClick }) {
  const navigate = useNavigate();

  return (
    <TopDiv>
      <ArrowLeftBtn
        onClick={() => {
          navigate(-1);
        }}
      />
      <ArrowLeftBtnText>{children}</ArrowLeftBtnText>
      <OptionBtn onClick={onClick} />
    </TopDiv>
  );
}
