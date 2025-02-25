import { styled } from 'styled-components';

export const Container = styled.div`
  background: #f5f5f5;
  border-radius: 10px;
  border: 2px solid #232129;
  padding: 16px;
  width: 100%;
  color: #666360;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  input {
    flex: 1;
    background: transparent;
    border: 0;

    &::placeholder {
      color: #000;
    }
  }

  svg {
    margin-right: 16px;
  }
`;
