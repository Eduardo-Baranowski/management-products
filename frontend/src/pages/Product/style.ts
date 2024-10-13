import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Input = styled.input`
  height: 3.5rem;
  align-self: stretch;

  border-radius: 0.5rem;
  border: 1px solid #dcdcdc;
  background: #fff;
  box-shadow: 2px 2px 4px 0px rgba(21, 69, 128, 0.1);

  font-family: Inter;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 400;
  padding-left: 0.5rem;

  &:active {
    border: #1875e9;
  }
`;

export const Label = styled.label`
  color: #144480;
  font-family: Inter;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-top: 10px;
`;

export const ViewInput = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
`;

export const ViewSelect = styled.div`
  width: 100%;
`;

export const ViewForm = styled.div`
  background-color: #ffffff;
  display: flex;
  padding: 3rem 1rem;
  width: 560px;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
  border-radius: 1rem;
`;
