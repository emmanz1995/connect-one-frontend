import React, { useEffect, useState } from 'react'
import Card from '../../components/card/Card'
import Navbar from '../../components/navbar/Navbar'
import './feed.scss'
import { UserService } from '../../service/user'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { getPosts, createPosts } from '../../app/action/postAction'

const Feed = () => {
    const [user, setUser] = useState({})
    const [users, setUsers] = useState([])
    const [content, setContent] = useState('')
    const [image, setImage] = useState('')
    const [message, setMessage] = useState('')
    const [url, setUrl] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { posts, loading } = useSelector((state) => state.posts)

    useEffect(() => {
        dispatch(getPosts())
    }, [])

    useEffect(() => {
        if(url) {
            const formData = {
                content: content,
                image: url
            }
            dispatch(createPosts(formData))
        }
    }, [url, dispatch])

    const postDetails = (evt) => {
        evt.preventDefault()
        let formData = new FormData()
        formData.append('file', image)
        formData.append('upload_preset', 'connect-one')
        formData.append('cloud_name', 'emmanuel-cloud-storage')
        setIsLoading(true)
        axios.post('https://api.cloudinary.com/v1_1/emmanuel-cloud-storage/image/upload', formData)
            .then((response) => {
                setUrl(response?.data?.secure_url)
                setIsLoading(false)
            })
            .catch((err) => {
                const errorMessage = (err.response && err.response.data && err.response.data.error && err.response.data.error.message) || err || err.error.message.toString()
                setTimeout(() => {
                    setMessage('')
                }, 5000)
                setMessage(errorMessage)
                console.log(errorMessage)
            })
    }

    const handleChange = (evt) => {
        setImage(evt.target.files[0])
    }

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

    return (
        <div className="feed">
            <Navbar />
            <div className="feed__post__container">
                <aside className="feed__aside">
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
                <div className="feed__wrapper">
                    {message && <div className="feed__message">{message}</div>}
                    <div className="feed__createPost">
                        <form>
                            <textarea name="content" id="" cols="30" rows="5" placeholder="Whats on your mind?" className="feed__input" value={content} onChange={(evt) => setContent(evt.target.value)} />
                            <input type="file" id="yourBtn" onChange={handleChange} /> <br /> <br />
                            <button type="submit" className="post-btn" onClick={postDetails} disabled={isLoading}>{isLoading ? 'Loading...' : 'Create Post'}</button>
                        </form>
                    </div>
                    {!loading ?
                        <div>
                            {posts?.length > 0 ? posts?.map((post) => (
                                <>
                                    <Card
                                        key={post.id}
                                        post={post}
                                    />
                                </>
                            )): <p>It's a ghost house here, upload something to break the silence!</p>}
                        </div> : <p>Posts are loading...</p>
                    }
                </div>
                <div className="feed__aside2">
                    <div className="user-card">
                        <h3>Users to follow</h3>
                        <div>
                            {filterOutCurrentUser?.length > 0 ? filterOutCurrentUser?.map((user) => (
                                <a href="#" className="card-user">
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                        <div className="user-image-wrapper">
                                            <img src={user?.avatar?.url} alt="" className="user-image" width="600" height="400" />
                                        </div>
                                        {user?.username}
                                    </div>
                                    <button className="follow-btn">Follow</button>
                                </a>
                            )): <p>No users to follow!</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Feed