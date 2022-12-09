import React, { FC } from 'react';
import Sidebar from '../sidebar/Sidebar';
import UserSidebar from '../userSidebar/UserSidebar';
import { MasterContainer, Main, Nav } from './styles';

const Master: FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <MasterContainer>
      <Sidebar />  
      <Main>
        <Nav>
          <ul>
            <li><a href="">Home</a></li>
            <li><a href="">Explore</a></li>
            <li><a href="">Profile</a></li>
            <li><a href="">Logout</a></li>
          </ul>
        </Nav>
        {children}
      </Main>
      <UserSidebar />
    </MasterContainer>
  )
}

export default Master