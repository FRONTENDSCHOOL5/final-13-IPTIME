import { styled } from 'styled-components';

export const Alert = styled.div`
  width: 25.2rem;
  height: 11rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  text-align: center;

  p {
    padding-top: 2.2rem;
    flex-grow: 1;
    font-size: 1.6rem;
    font-weight: 500;
    border-bottom: 0.05rem solid var(--sub-grey);
  }

  button {
    width: 12.6rem;
    height: 4.6rem;
    font-size: 1.4rem;

    &:first-child {
      border-right: 0.05rem solid var(--sub-grey);
    }
    &:last-child {
      color: var(--main-purple);
      font-weight: 500;
    }
  }
`;