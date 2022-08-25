import React, { useEffect, useState } from 'react'
import Card from '../../components/card/Card'
import Navbar from '../../components/navbar/Navbar'
import './feed.scss'
import { PostService } from '../../service/post'
import { UserService } from '../../service/user'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Feed = () => {
    const [posts, setPosts] = useState([])
    const [user, setUser] = useState({})
    const [content, setContent] = useState('')
    const [image, setImage] = useState('')
    const [message, setMessage] = useState('')
    const [url, setUrl] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        setLoading(true)
        PostService.getPosts().then((response) => {
            setPosts(response)
            setLoading(false)
        }).catch(err => {
            console.log(err)
            setLoading(false)
        })
    }, [])

    useEffect(() => {
        if(url) {
            const formData = {
                content: content,
                image: url
            }
            PostService.onCreatePost(formData)
                .then((payload) => {
                    setPosts([ ...posts, payload ])
                    setContent('')
                    setImage('')
                    console.log(payload)
                    setTimeout(() => {
                        setMessage('Successfully Created Post!')
                    }, 5000)
                })
                .catch((err) => {
                    const errorMessage = (err.response && err.response.data && err.response.data.msg) || err || err.msg.toString()
                    setMessage(errorMessage)
                    console.log(errorMessage)
                })
        }
    }, [url])

    const postDetails = (evt) => {
        evt.preventDefault()
        let formData = new FormData()
        formData.append('file', image)
        formData.append('upload_preset', 'connect-one')
        formData.append('cloud_name', 'emmanuel-cloud-storage')
        setLoading(true)
        axios.post('https://api.cloudinary.com/v1_1/emmanuel-cloud-storage/image/upload', formData)
            .then((response) => {
                setUrl(response?.data?.secure_url)
                setLoading(false)
            })
            .catch((err) => {
                const errorMessage = (err.response && err.response.data && err.response.data.error && err.response.data.error.message) || err || err.error.message.toString()
                setTimeout(() => {
                    setMessage('')
                }, 5000)
                setMessage(errorMessage)
                setLoading(false)
                console.log(errorMessage)
            })
    }

    const handleLikePost = async (id) => {
        try {
            const payload = await PostService.onLikePost(id)
            const like = posts.map((post) => post.id === payload.id ? { ...payload } : post)
            setPosts(like)
        } catch(err) {
            const errorMessage = (err.response && err.response.data && err.response.data.msg) || err || err.msg.toString()
            console.log(errorMessage)
        }
    }
    const handleDislikePost = async (id) => {
        try {
            const payload = await PostService.onDislikePost(id)
            const like = posts.map((post) => post.id === id ? { ...payload } : post)
            setPosts(like)
        } catch(err) {
            const errorMessage = (err.response && err.response.data && err.response.data.msg) || err || err.msg.toString()
            console.log(errorMessage)
        }
    }

    const handleDeletePost = async (id) => {
        try {
            const payload = await PostService.onDeletePost(id)
            const filterOutPost = posts.filter((post) => post.id !== payload.id)
            setPosts(filterOutPost)
        } catch(err) {
            const errorMessage = (err.response && err.response.data && err.response.data.msg) || err || err.msg.toString()
            console.log(errorMessage)
        }
    }

    const handleChange = (evt) => {
        setImage(evt.target.files[0])
    }

    useEffect(() => {
        UserService.getMe().then((response) => {
            setUser(response)
        }).catch(err => console.log(err))
    }, [])

    return (
        <div className="feed">
            <Navbar />
            <div className="feed__post__container">
                <aside className="feed__aside">
                    <div className="profile-card">
                        <div className="user-info1">
                            <div className="profile-img-container">
                                {user.avatar ? <img className="profile-img" src={user?.avatar?.url} alt="" width="600" height="400" /> : <img src="/assets/undraw_male_avatar_323b.svg" alt="" className="profile-img" />}
                            </div>
                            <p><b>{user.name}</b></p>
                            <p>{user.username}</p>
                        </div>
                        <hr />
                        <div>
                            <p>Joined In: {moment(user.createdAt).format('DD/MM/YYYY')}</p><br/>
                            <p>{user.email}</p><br/>
                            <p>Birthday: {moment(user.dob).format('DD/MM/YYYY')}</p>
                        </div>
                        <button className="go-profile-btn" onClick={() => navigate('/profile')}>Go to Profile</button>
                    </div>
                    <div className="menu">
                        <h3>Menu</h3>
                        <ul className="ul">
                            <li><a className="ul__link" href="/feed"><b>Explore</b></a></li>
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
                            <button type="submit" className="post-btn" onClick={postDetails} disabled={loading}>{loading ? 'Loading...' : 'Create Post'}</button>
                        </form>
                    </div>
                    {!loading ?
                        <div>
                            {posts?.length > 0 ? posts?.map((post) => (
                                <>
                                    <Card
                                        key={post.id}
                                        post={post}
                                        handleLikePost={handleLikePost}
                                        handleDislikePost={handleDislikePost}
                                        handleDeletePost={handleDeletePost}
                                    />
                                </>
                            )): <p>It's a ghost house here, upload something to break the silence!</p>}
                        </div> : <p>Posts are loading...</p>
                    }
                </div>
                <div className="feed__aside2">
                    <div className="user-card">
                        <h3>Users</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Feed