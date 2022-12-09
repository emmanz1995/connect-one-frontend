import styled from 'styled-components';

export const CreatePostContainer = styled.form`
  width: 100%;
  padding: 30px;
  background-color: rgb(17 24 39 / 1);
  color: ${props => props.theme.light_color};
  border-radius: 8px;
  .img {
    width: 100%;
    height: auto;
    border-radius: 9999px;
    cursor: pointer;
  }
`;

export const Input = styled.input`
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid #ddd;
  width: 100%;
  background-color: ${props => props.theme.light_color};
  cursor: pointer;
  caret-color: transparent;
`;