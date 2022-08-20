import React, { useState, useEffect } from 'react'
import Card from '../../components/card/Card'
import Navbar from '../../components/navbar/Navbar'
import './feed.scss'
import { PostService } from '../../service/post'
import { UserService } from '../../service/user'
import moment from 'moment'

const Feed = () => {
    const [posts, setPosts] = useState([])
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        PostService.getPosts().then((response) => {
            setPosts(response)
        }).catch(err => console.log(err))
    }, [])

    const handleLikePost = async (id) => {
        try {
            const payload = await PostService.onLikePost(id)
            const like = posts.map((post) => post.id === id ? { ...post, ...payload } : post)
            setPosts(like)
            console.log(payload)
        } catch(err) {
            const errorMessage = (err.response && err.response.data && err.response.data.msg) || err || err.msg.toString()
            console.log(errorMessage)
        }
    }
    const handleDislikePost = async (id) => {
        try {
            const payload = await PostService.onDislikePost(id)
            const like = posts.map((post) => post.id === id ? { ...post, ...payload } : post)
            setPosts(like)
            console.log(payload)
        } catch(err) {
            const errorMessage = (err.response && err.response.data && err.response.data.msg) || err || err.msg.toString()
            console.log(errorMessage)
        }
    }

    const handleDeletePost = async (id) => {
        try {
            const payload = await PostService.onDeletePost(id)
            const filterOutPost = posts.filter((post) => post.id !== payload.id)
            console.log(payload)
            setPosts(filterOutPost)
        } catch(err) {
            const errorMessage = (err.response && err.response.data && err.response.data.msg) || err || err.msg.toString()
            console.log(errorMessage)
        }
    }

    useEffect(() => {
        UserService.getMe().then((response) => {
            setUser(response)
        }).catch(err => console.log(err))
    }, [])

    console.log(user)

    return (
        <div className="feed">
            <Navbar />
            <div className="feed__post__container">
                <div className="feed__wrapper">
                    <div>
                        {posts.map((post) => (
                            <Card
                                key={post.id}
                                post={post}
                                handleLikePost={handleLikePost}
                                handleDislikePost={handleDislikePost}
                                handleDeletePost={handleDeletePost}
                            />
                        ))}
                    </div>
                </div>
                <aside className="feed__aside">
                    <div className="profile-card">
                        <div className="user-info1">
                            <div className="profile-img-container">
                                {user.avatar ? <img className="profile-img" src={user.avatar} alt="" width="600" height="400" /> : <img src="/assets/undraw_male_avatar_323b.svg" alt="" className="profile-img" />}

                            </div>
                            <p>{user.name}</p>
                            <p>{user.username}</p>
                        </div>
                        <hr />
                        <div>
                            <p>Joined In: {moment(user.createdAt).format('YYYY/MM/DD')}</p><br/>
                            <p>{user.email}</p><br/>
                            <p>Birthday: {moment(user.dob).format('YYYY/MM/DD')}</p>
                        </div>
                        <button className="go-profile-btn">Go to Profile</button>
                    </div>
                    <div className="menu">
                        <h3>Menu</h3>
                        <ul className="ul">
                            <li><a className="ul__link" href="">Explore</a></li>
                            <hr />
                            <li><a className="ul__link" href="">Profile</a></li>
                            <hr />
                            <li><a className="ul__link" href="">Settings</a></li>
                            <hr />
                            <li><a className="ul__link" href="">Find Users</a></li>
                        </ul>
                    </div>
                </aside>
            </div>
        </div>
    )
}

export default Feed