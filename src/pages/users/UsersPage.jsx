import React, { useEffect, useState } from 'react'
import './users.scss'
import Navbar from '../../components/navbar/Navbar'
import { UserService } from '../../service/user'
import { AuthService } from '../../service/auth'
import { useDispatch } from 'react-redux'
import { followUser, unFollowUser } from '../../app/action/userAction'

const UsersPage = () => {
    const dispatch = useDispatch()
    const [ users, setUsers ] = useState([])
    const [userInfo, setUserInfo] = useState({})
    const currentUser = AuthService.getCurrentUser()

    const getAllUser = () => {
        UserService.getAllUsers().then((response) => {
            setUsers(response)
        }).catch(err => console.log(err))
    }

    const getMe = () => {
        UserService.getMe().then((response) => {
            setUserInfo(response)
        }).catch((error) => console.log(error))
    }

    useEffect(() => {
        getAllUser()
        getMe()
    }, [])

    const filterUsers = users.filter((user) => ( user.id !== currentUser.id ))

    const handleFollowUser = (id) => {
        dispatch(followUser(id))
    }

    const handleUnFollowUser = (id) => {
        dispatch(unFollowUser(id))
    }

    return (
        <div className="users">
            <Navbar />
            <div className="users__container">
                <h3>Find Users</h3>
                <form className="users__searchForm">
                    <input type="search" placeholder="Search for Users" />
                    <button>Search User</button>
                </form>
                <div className="users__wrapper">
                    {filterUsers.map(user => (
                        <div key={user.id} className="users__card">
                            <div className="users__cardHeading">
                                <div className="users__imgWrapper">
                                    {user.avatar ? <img src={user.avatar.url} alt="" className="users__userImg"/> : <img src="/assets/undraw_male_avatar_323b.svg" alt="" className="users__userImg" />}
                                </div>
                                <a className="user-link" href={`/user/${user.id}`}>{user.username}</a>
                            </div>
                            <div>
                                {userInfo?.following?.includes(user?.id) ? <button className="follow-btn" onClick={() => handleUnFollowUser(user.id)}>UnFollow</button> : <button className="follow-btn" onClick={() => handleFollowUser(user.id)}>Follow</button>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default UsersPage