import React, { useState, useEffect } from 'react'
import Navbar from '../../components/navbar/Navbar'
import { useParams } from 'react-router-dom'
import { PostService } from '../../service/post'
import './singlePost.scss'
import { FaTrash } from 'react-icons/fa'

const SinglePost = () => {
    const { postId } = useParams()
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        PostService.getPosts().then((response) => {
            setPosts(response)
        }).catch(err => console.log(err))
    }, [])
    const singlePost = posts.find((post) => post.id === postId)
    console.log(singlePost)
    return (
        <div className="singlePost">
            <Navbar />
            <div className="singlePost__wrapper">
                <div className="singlePost__card">
                    <div className="flex-post">
                        <img src={singlePost.image} alt="" width="600" height="400" className="post-img" />
                    </div>
                    <div className="flex-comment">
                        <div className="comment-header">
                            <div>
                                <p>{singlePost.postedBy.username}</p>
                            </div>
                            <div>
                                <FaTrash size={20} />
                            </div>
                        </div><hr />
                        <div className="comment-content"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SinglePost