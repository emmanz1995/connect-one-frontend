import React, { useState, useEffect } from 'react'
import Card from '../../components/card/Card'
import Navbar from '../../components/navbar/Navbar'
import './feed.scss'
import { PostService } from '../../service/post'

const Feed = () => {
    const [posts, setPosts] = useState([])
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

    return (
        <div className="feed">
            <Navbar />
            <div className="feed__post__container">
                <div className="feed__wrapper">
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
        </div>
    )
}

export default Feed