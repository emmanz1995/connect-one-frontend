import React, { useEffect, useState } from 'react'
import './users.scss'
import Navbar from '../../components/navbar/Navbar'
import { UserService } from '../../service/user'
import { AuthService } from '../../service/auth'

const UsersPage = () => {
    const [ users, setUsers ] = useState([])
    const currentUser = AuthService.getCurrentUser()
    useEffect(() => {
        UserService.getAllUsers().then((response) => {
            setUsers(response)
        }).catch(err => console.log(err))
    }, [])

    const filterUsers = users.filter((user) => ( user.id !== currentUser.id ))

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
                                    {user.avatar ? <img src={user.avatar} alt="" className="users__userImg"/> : <img src="/assets/undraw_male_avatar_323b.svg" alt="" className="users__userImg" />}
                                </div>
                                <a className="user-link" href={`/user/${user.id}`}>{user.username}</a>
                            </div>
                            <div>
                                <button className="follow-btn">Follow</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default UsersPage