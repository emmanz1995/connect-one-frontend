import React, { useState, useEffect } from 'react'
import Navbar from '../../components/navbar/Navbar'
import { useParams } from 'react-router-dom'
import { PostService } from '../../service/post'
import './singlePost.scss'
import { FaTrash, FaStar, FaRegStar, FaRegComment, FaRegBookmark } from 'react-icons/fa'

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
    return (
        <div className="singlePost">
            <Navbar />
            <div className="singlePost__wrapper">
                <div className="singlePost__card">
                    <div className="flex-post">
                        <img src={singlePost?.image} alt="" width="600" height="400" className="post-img" />
                    </div>
                    <div className="flex-comment">
                        <div className="comment-header">
                            <div>
                                <p>{singlePost?.postedBy?.username}</p>
                            </div>
                            <div>
                                <FaTrash size={20} />
                            </div>
                        </div>
                        <div className="comment-content">
                            <div className="comment-wrapper">
                                {singlePost?.comments?.length > 0 ? singlePost?.comments?.map((comment) => (
                                    <div key={comment?.id} className="comment-strip">
                                        <b>{comment?.postedBy?.username}</b>
                                        <p>{comment?.comment}</p>
                                    </div>
                                )): <b>Be the first to comment on this post!</b>}<br /><br />
                            </div>
                            <p>{singlePost?.content}</p>
                            <hr />
                            <div className="comment-action-strip">
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <b>{singlePost?.likes?.length}</b><FaRegStar size={20} />
                                    </span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <b>{singlePost?.comments?.length}</b><FaRegComment size={20} />
                                    </span>
                                </div>
                                <div>
                                    <FaRegBookmark size={20} />
                                </div>
                            </div>
                            <form className="commentForm">
                                <input type="text" name="comment" className="commentForm__input" placeholder="Write your comment here" />
                                <button className="commentForm__btn"><b>Post Comment</b></button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SinglePost