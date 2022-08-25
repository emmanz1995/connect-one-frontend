import React, { useState, useEffect } from 'react'
import { PostService } from '../../service/post'
import { AuthService } from '../../service/auth'
import './singlePost.scss'
import { FaTrash, FaStar, FaRegStar, FaRegComment, FaRegBookmark, FaRegWindowClose } from 'react-icons/fa'
import BackDrop from '../../components/backDrop/BackDrop'

const SinglePost = (props) => {
    const [posts, setPosts] = useState([])
    const currentUser = AuthService.getCurrentUser()

    useEffect(() => {
        PostService.getPosts().then((response) => {
            setPosts(response)
        }).catch(err => console.log(err))
    }, [])
    const singlePost = posts.find((post) => post.id === props.postId)

    return (
        <BackDrop onClick={props.handleHide}>
            <div onClick={(evt) => evt.stopPropagation()} className="singlePost">
                <div className="singlePost__wrapper">
                    <div className="singlePost__card">
                        <div className="flex-post">
                            <img src={singlePost?.image} alt="" width="600" height="400" className="post-img" />
                        </div>
                        <div className="flex-comment">
                            <div className="comment-header">
                                <div>
                                    <p>{props?.post?.postedBy?.username}</p>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                                    {props?.post?.postedBy?.username.includes(currentUser.username) && (
                                        <FaTrash size={20} />
                                    )}
                                    <FaRegWindowClose size={20} onClick={props.handleHide} />
                                </div>
                            </div>
                            <div className="comment-content">
                                <div className="comment-wrapper">
                                    {props?.post?.comments?.length > 0 ? props?.post?.comments?.map((comment) => (
                                        <div key={comment?.id} className="comment-strip">
                                            <b>{comment?.postedBy?.username}</b>
                                            <p>{comment?.comment}</p>
                                        </div>
                                    )): <b>Be the first to comment on this post!</b>}<br /><br />
                                </div>
                                <p>{props?.post?.content}</p>
                                <hr />
                                <div className="comment-action-strip">
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <b>{props?.post?.likes?.length}</b><FaRegStar onClick={() => props.handleLikePost(props.postId)} size={20} />
                                    </span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <b>{props?.post?.comments?.length}</b><FaRegComment size={20} />
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
        </BackDrop>

    )
}

export default SinglePost