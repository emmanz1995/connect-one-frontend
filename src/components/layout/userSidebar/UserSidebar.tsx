import React, { useEffect } from 'react'
import { StyledAside, StyledUserList } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../../redux/actions/user';
// import { Fa } from 'react-icons/fa';

const UserSidebar = () => {
  const { users } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch<any>(getUsers());
  }, [dispatch]);
  return (
    <StyledAside>
      <StyledUserList>
        <h1>Users to follow</h1>
        <div style={{ margin: '15px 0' }}>
          {users?.length > 0 ? users?.map((user: any) => (
            <li key={user?.id} className="user-li">
              <span style={{ display: 'flex', gap: 5, alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
                  <div style={{ width: 30, height: 30 }}>
                    <img src={user?.avatar?.url} alt="" style={{ width: '100%', height: '100%', borderRadius: '100%', cursor: 'pointer' }} width='50px' height='50px' />
                  </div>
                  <h5>{user?.username}</h5>
                </div>
                <button className="follow-btn">Follow</button>
              </span>
            </li>
          )): <p>No others found!</p>}
        </div>
      </StyledUserList>
    </StyledAside>
  )
}

export default UserSidebar