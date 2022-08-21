import React, {useEffect, useState} from 'react'
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
                })
                .catch((err) => console.log(err))
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
                console.log(err)
                setLoading(false)
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
                <div className="feed__wrapper">
                    <div className="feed__createPost">
                        <form>
                            <textarea name="content" id="" cols="30" rows="5" placeholder="Whats on your mind?" className="feed__input" value={content} onChange={(evt) => setContent(evt.target.value)} />
                            <input type="file" onChange={handleChange} /> <br /> <br />
                            <button type="submit" className="post-btn" onClick={postDetails} disabled={loading}>{loading ? 'Loading...' : 'Create Post'}</button>
                        </form>
                    </div>
                    {!loading ?
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
                        </div> : <p>Posts are loading...</p>
                    }
                </div>
                <aside className="feed__aside">
                    <div className="profile-card">
                        <div className="user-info1">
                            <div className="profile-img-container">
                                {user.avatar ? <img className="profile-img" src={user.avatar} alt="" width="600" height="400" /> : <img src="/assets/undraw_male_avatar_323b.svg" alt="" className="profile-img" />}
                            </div>
                            <p><b>{user.name}</b></p>
                            <p>{user.username}</p>
                        </div>
                        <hr />
                        <div>
                            <p>Joined In: {moment(user.createdAt).format('YYYY/MM/DD')}</p><br/>
                            <p>{user.email}</p><br/>
                            <p>Birthday: {moment(user.dob).format('YYYY/MM/DD')}</p>
                        </div>
                        <button className="go-profile-btn" onClick={() => navigate('/profile')}>Go to Profile</button>
                    </div>
                    <div className="menu">
                        <h3>Menu</h3>
                        <ul className="ul">
                            <li><a className="ul__link" href="/feed">Explore</a></li>
                            <li><a className="ul__link" href="">Profile</a></li>
                            <li><a className="ul__link" href="">Settings</a></li>
                            <li><a className="ul__link" href="/find-users">Find Users</a></li>
                        </ul>
                    </div>
                </aside>
            </div>
        </div>
    )
}

export default Feed