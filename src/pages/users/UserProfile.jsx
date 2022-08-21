import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import './users.scss'
import { UserService } from '../../service/user'
import { useParams } from 'react-router-dom'
import moment from 'moment'

const UserProfile = () => {
    const [ users, setUsers ] = useState([])
    const { userId } = useParams()
    useEffect(() => {
        UserService.getAllUsers().then((response) => {
            setUsers(response)
        }).catch(err => console.log(err))
    }, [])

    const user = users.find((user) => user.id === userId)

    return (
        <div className="user">
            <Navbar />
            <div className="user__profile">
                <div className="user__header">
                    <div style={{ display: 'flex', gap: '20px' }}>
                        <div className="user-img-wrapper">
                            {user?.avatar ? <img src={user?.avatar} alt="" className="user-profile-img"/> : <img src="/assets/undraw_male_avatar_323b.svg" alt="" className="user-profile-img" />}
                        </div>
                        <div>
                            <h3>{user?.name}</h3><br />
                            <p>{user?.username}</p><br />
                            <p>Birthday: {moment(user?.dob).format('DD/MM/YYYY')}</p>
                        </div>
                    </div>
                    <div>
                        <button className="btn-follow">Follow User</button>
                    </div>
                </div>
                <div className="post-container">
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 20, margin: '10px 0' }}>
                        {user?.post?.length > 0 ? user?.post?.map((post) => (
                            <div className="post-img-wrapper">
                                <img className="post-img" src={post?.image} alt="" width="600" height="400" />
                            </div>
                        )): <p>User has no posts, sorry!</p>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile