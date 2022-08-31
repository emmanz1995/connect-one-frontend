import React, { useEffect, useState } from 'react'
import Card from '../../components/card/Card'
import Navbar from '../../components/navbar/Navbar'
import './explore.scss'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { getPosts, createPosts } from '../../app/action/postAction'
import Layout from "../../components/layout/Layout";

const Explore = () => {

    const [content, setContent] = useState('')
    const [image, setImage] = useState('')
    const [message, setMessage] = useState('')
    const [url, setUrl] = useState('')
    const [isLoading, setIsLoading] = useState(false)

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

    return (
        <div className="feed">
            <Navbar />
            <Layout>
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
            </Layout>
        </div>
    )
}

export default Explore