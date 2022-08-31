import React, { useEffect, useState } from 'react'
import './layout.scss'
import { UserService } from '../../service/user'
import { followUser, unFollowUser } from '../../app/action/userAction'
import { useDispatch } from 'react-redux'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'


const Layout = ({ children }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [ user, setUser ] = useState({})
    const [ users, setUsers ] = useState([])
    useEffect(() => {
        UserService.getMe().then((response) => {
            setUser(response)
        }).catch(err => console.log(err))
    }, [])

    useEffect(() => {
        UserService.getAllUsers().then((response) => {
            setUsers(response)
        }).catch((err) => console.log(err))
    }, [])

    const filterOutCurrentUser = users.filter((u) => u.id !== user.id)

    const handleFollowUser = (id) => {
        dispatch(followUser(id))
        console.log(id)
    }

    const handleUnFollowUser = (id) => {
        dispatch(unFollowUser(id))
    }
    return (
        <div className="layout">
            <div className="layout__post__container">
                <aside className="layout__aside">
                    <div className="profile-card">
                        <div className="user-info1">
                            <div className="profile-img-container">
                                {user?.avatar ? <img className="profile-img" src={user?.avatar?.url} alt="" width="600" height="400" /> : <img src="/assets/undraw_male_avatar_323b.svg" alt="" className="profile-img" />}
                            </div>
                            <p><b>{user?.name}</b></p>
                            <p>{user?.username}</p>
                        </div>
                        <hr />
                        <div>
                            <p>Joined In: {moment(user?.createdAt).format('DD/MM/YYYY')}</p><br/>
                            <p>{user?.email}</p><br/>
                            <p>Birthday: {moment(user?.dob).format('DD/MM/YYYY')}</p>
                        </div>
                        <button className="go-profile-btn" onClick={() => navigate('/profile')}>Go to Profile</button>
                    </div>
                    <div className="menu">
                        <h3>Menu</h3>
                        <ul className="ul">
                            <li><a className="ul__link" href="/feed"><b>Feed</b></a></li>
                            <li><a className="ul__link" href="/explore"><b>Explore</b></a></li>
                            <li><a className="ul__link" href=""><b>Profile</b></a></li>
                            <li><a className="ul__link" href=""><b>Settings</b></a></li>
                            <li><a className="ul__link" href="/find-users"><b>Find Users</b></a></li>
                        </ul>
                    </div>
                </aside>
                <div>{children}</div>
                <aside className="layout__aside2">
                    <div className="user-card">
                        <h3>Users to follow</h3>
                        <div>
                            {filterOutCurrentUser?.length > 0 ? filterOutCurrentUser?.map((u) => (
                                <a href="#" className="card-user">
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                        <div className="user-image-wrapper">
                                            <img src={u?.avatar?.url} alt="" className="user-image" width="600" height="400" />
                                        </div>
                                        {u?.username}
                                    </div>
                                    {u?.follower?.includes(user?.id) ? <button className="follow-btn" onClick={() => handleUnFollowUser(u?.id)}>Unfollow</button> : <button className="follow-btn" onClick={() => handleFollowUser(u?.id)}>Follow</button>}
                                </a>
                            )): <p>No users to follow!</p>}
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    )
}

export default Layout