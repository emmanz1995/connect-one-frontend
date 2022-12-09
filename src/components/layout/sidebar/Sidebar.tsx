import React from 'react';
import { StyledSidebar, List, NavLink, SignoutButton } from './styles';
import { FaHome, FaSignOutAlt, FaCompass, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/actions/auth';

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignout = () => {
    dispatch<any>(logout());
    navigate('/');
  }
  
  return (
    <StyledSidebar>
      <List>
        <div>
          <h1>Connect One</h1>
        </div>
        <NavLink>
          <FaHome style={{ fontSize: 20 }} /><a href="/feed">{' '}Home</a>
        </NavLink>
        <NavLink>
          <FaCompass style={{ fontSize: 20 }} />{' '}<a href="/#">Explore</a>
        </NavLink>
        <NavLink>
          <FaUser style={{ fontSize: 20 }} />{' '}<a href="/profile">Profile</a>
        </NavLink>
        <NavLink>
          {/* @ts-ignore */}
          <SignoutButton onClick={handleSignout}><FaSignOutAlt />{' '}Logout</SignoutButton>
        </NavLink>
      </List>
    </StyledSidebar>
  )
}

export default Sidebar