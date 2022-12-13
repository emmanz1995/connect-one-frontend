import React from 'react';
import styled, { keyframes } from 'styled-components';

export const LoadingEffect = () => {
  return (
    <LoadingContainer>
      <FlexContainer>
        <ImgContainer></ImgContainer>
        <TextContainer></TextContainer>
      </FlexContainer>
      <ButtonContainer></ButtonContainer>
    </LoadingContainer>
  )
}

const PulseKeyFrame = keyframes`
  0%, 100% {
    opacity: 1;
  }

  50% {
    opacity: .5;
  }
`

const LoadingContainer = styled.div`
  padding: 10px;
  border-radius: 5px;
  margin: 15px 0;
  background-color: rgb(31 41 55);
  display: flex;
  align-items: center;
  justify-content: space-between;
  animation: ${PulseKeyFrame} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
`;

const ImgContainer = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 100%;
  cursor: pointer;
  background-color: rgb(17 24 39 / 1);
`

const TextContainer = styled.div`
  width: 40px;
  padding: 7px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: rgb(17 24 39 / 1);
`

const ButtonContainer = styled.div`
  width: 40px;
  padding: 7px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: rgb(17 24 39 / 1);
`

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`
