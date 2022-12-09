import React from 'react';
import styled from 'styled-components';

const Backdrop = ({ children }: any) => {
  return (
    <BackdropWrapper>{children}</BackdropWrapper>
  );
}

const BackdropWrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  background: rgb(0 0 0 / 0.5);
  opacity: 1;
  z-index: 1;
`;

export default Backdrop;