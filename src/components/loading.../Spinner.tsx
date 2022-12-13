import React from 'react';
import { ImSpinner3 } from 'react-icons/im';
import styled, { keyframes } from 'styled-components';

const Spinner = () => {
  return (
    <Icon>Spinner</Icon>
  )
}

const Rotation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const Icon = styled(ImSpinner3)`
  font-size: 22px;
  color: #fff;
  animation: ${Rotation} 1s linear infinite;
`

export default Spinner;