import React from 'react'
import './card.scss'
import { FaTrash, FaStar, FaRegStar, FaComment, FaBookmark, FaRegBookmark } from 'react-icons/fa'
import { AuthService } from '../../service/auth'
import SinglePost from '../../pages/singlePost/SinglePost'
import useOpenModal from '../../hooks/useOpenModal'
import { useDispatch } from 'react-redux'
import { likePost, dislikePost, deletePost, bookmarkPost, unBookmarkPost } from '../../app/action/postAction'

const Card = (props) => {
    const { post } = props
    const user = AuthService.getCurrentUser()
    const { reveal, handleReveal, handleHide } = useOpenModal()
    const dispatch = useDispatch()

    const handleLikePost = (id) => {
        dispatch(likePost(id))
    }

    const handleDislikePost = (id) => {
        dispatch(dislikePost(id))
    }

    const handleDeletePost = (id) => {
        dispatch(deletePost(id))
    }

    const handleBookmarkPost = (id) => {
        dispatch(bookmarkPost(id))
    }
    const handleUnBookmarkPost = (id) => {
        dispatch(unBookmarkPost(id))
    }

    return (
        <div className="card">
            <div className="card__header">
                <div className="card__flex">
                    <div className="card__img__wrapper">
                        <img src={post?.postedBy.avatar?.url} alt="" className="card__img"/>
                    </div>
                    <a href="#" className="link">{post?.postedBy?.username}</a>
                </div>
                {post?.postedBy?.id?.includes(user?.id) && (
                    <div>
                        <FaTrash size={20} style={{ cursor: 'pointer' }} onClick={() => handleDeletePost(post?.id)} />
                    </div>
                )}
            </div>
            <div className="card__content">
                <div className="img__wrapper">
                    <a href='#' onClick={() => handleReveal(post.id)}>
                        <img src={post?.image} alt="" className="img" width="600" height="400" />
                    </a>
                </div>
                <span>
                    <p><b>{post?.postedBy?.username}</b>{' '}{post?.content}</p>
                </span>
            </div>
            <div className="card__footer">
                <div className="card__actions">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                        <p>{post?.likes?.length}</p>
                        {post?.likes?.includes(user?.id) ? <FaStar size={20} style={{ cursor: 'pointer' }} onClick={() => handleDislikePost(post?.id)} /> : <FaRegStar style={{ cursor: 'pointer' }} size={20} onClick={() => handleLikePost(post.id)} />}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                        <p>{post.comments.length}</p>
                        <FaComment size={20} style={{ cursor: 'pointer' }} />
                    </div>
                </div>
                <div>
                    {post?.bookmarks?.includes(user?.id) ? <FaBookmark size={20} style={{ cursor: 'pointer' }} onClick={() => handleUnBookmarkPost(post.id)} /> : <FaRegBookmark size={20} style={{ cursor: 'pointer' }} onClick={() => handleBookmarkPost(post.id)} />}
                </div>
            </div>
            {reveal && <SinglePost postId={post.id} post={post} handleLikePost={handleLikePost} handleHide={handleHide} />}
        </div>
    );
};

export default Card;