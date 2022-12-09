import React from 'react';
import Backdrop from './Backdrop';
import styled from 'styled-components';

const Modal = ({ children }: any) => {
  return (
    <Backdrop>
      <ModalContainer>
        {children}
      </ModalContainer>
    </Backdrop>
  );
}

const ModalContainer = styled.div`
  width: 365px;
  background-color: rgb(31 41 55 / 1);
  padding: 15px;
  border-radius: 8px;
`

export default Modal;