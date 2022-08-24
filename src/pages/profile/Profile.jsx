import React, { useEffect, useState } from 'react'
import './profile.scss'
import Navbar from '../../components/navbar/Navbar'
import moment from 'moment'
import { UserService } from '../../service/user'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
    const [ user, setUser ] = useState({})
    const navigate = useNavigate()
    useEffect(() => {
        UserService.getMe().then((response) => {
            setUser(response)
        }).catch(err => console.log(err))
    }, [])
    return (
        <div className="profile">
            <Navbar />
            <div className="profile__user">
                <div className="profile__header">
                    <div style={{ display: 'flex', gap: '20px' }}>
                        <div className="user-img-wrapper">
                            {user?.avatar ? <img src={user?.avatar?.url} alt="" className="profile-img"/> : <img src="/assets/undraw_male_avatar_323b.svg" alt="" className="profile-img" />}
                        </div>
                        <div>
                            <h3>{user?.name}</h3><br />
                            <p>{user?.username}</p><br />
                            <p>Birthday: {moment(user?.dob).format('DD/MM/YYYY')}</p>
                        </div>
                    </div>
                    <div>
                        <button className="edit-btn">Edit</button>
                    </div>
                </div>
                <div className="post-container">
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 20, margin: '10px 0' }}>
                        {user?.post?.length > 0 ? user?.post?.map((post) => (
                            <div className="post-img-wrapper">
                                <img className="post-img" src={post?.image?.url} alt="" width="600" height="400" onClick={() => navigate(`/post/${post?.id}`)} />
                            </div>
                        )): <p>User has no posts, sorry!</p>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile