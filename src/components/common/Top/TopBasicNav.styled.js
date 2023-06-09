import styled from 'styled-components';
import arrowLeft from '../../../assets/img/icon-arrow-left.svg';
import optionImg from '../../../assets/img/icon-more-vertical.svg';

const TopDiv = styled.div`
  width: 100%;
  height: 4.8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.6rem;
  border-bottom: 0.05rem solid var(--sub-grey);
  position: fixed;
  background-color: white;
  z-index: 10;
  left: 0;
  top: 0;
`;
const ArrowLeftBtn = styled.button`
  background-color: inherit;
  border: none;
  width: 2.2rem;
  height: 2.2rem;
  background-image: url(${arrowLeft});
`;
const OptionBtn = styled.button`
  background-color: inherit;
  border: none;
  width: 2.4rem;
  height: 2.4rem;
  background: url(${optionImg}) no-repeat center / contain;
`;

const ArrowLeftBtnText = styled.span`
  margin-right: auto;
  padding-left: 1rem;
  font-size: 1.4rem;
`;

export { TopDiv, ArrowLeftBtn, OptionBtn, ArrowLeftBtnText };
