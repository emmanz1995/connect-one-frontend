import React from 'react'
import './card.scss'
import { FaTrash, FaStar, FaRegStar, FaComment, FaBookmark } from 'react-icons/fa'
import { AuthService } from '../../service/auth'

const Card = ({ post, handleLikePost, handleDislikePost, handleDeletePost }) => {
    const user = AuthService.getCurrentUser()
    return (
        <div>
            {post.image ?
                <div className="card">
                    <div className="card__header">
                        <div className="card__flex">
                            <div className="card__img__wrapper">
                                {post?.postedBy?.avatar?.url?.includes(user?.avatar?.url) ?
                                    <img src={post?.postedBy.avatar?.url} alt="" className="card__img"/>
                                    :
                                    <img src="/assets/undraw_male_avatar_323b.svg" alt="" className="card__img"/>
                                }
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
                            <a href={`/post/${post.id}`}>
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
                            <div style={{ display: 'flex', alignItems: 'center', gap: 5}}>
                                <p>{post.comments.length}</p>
                                <FaComment size={20} style={{ cursor: 'pointer' }} />
                            </div>
                        </div>
                        <div>
                            <FaBookmark size={20} style={{ cursor: 'pointer' }} />
                        </div>
                    </div>
                </div> : <div className="card2">
                    <div className="card2__header">
                        <div className="card2__flex">
                            <div className="card2__img__wrapper">
                                {post?.postedBy?.avatar?.includes(user?.avatar) ?
                                    <img src={post?.postedBy.avatar} alt="" className="card__img"/>
                                    :
                                    <img src="/assets/undraw_male_avatar_323b.svg" alt="" className="card__img"/>
                                }
                            </div>
                            <a href="#" className="link">{post?.postedBy?.username}</a>
                        </div>
                        {post?.postedBy?.id?.includes(user?.id) && (
                            <div>
                                <FaTrash size={20} style={{ cursor: 'pointer' }} onClick={() => handleDeletePost(post?.id)} />
                            </div>
                        )}
                    </div>
                    <div className="card2__content">
                        <span>
                            <p><b>{post?.postedBy?.username}</b>{' '}{post?.content}</p>
                        </span>
                    </div>
                    <div className="card2__footer">
                        <div className="card2__actions">
                            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                                <p>{post?.likes?.length}</p>
                                {post?.likes?.includes(user?.id) ? <FaStar size={20} style={{ cursor: 'pointer' }} onClick={() => handleDislikePost(post?.id)} /> : <FaRegStar style={{ cursor: 'pointer' }} size={20} onClick={() => handleLikePost(post.id)} />}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 5}}>
                                <p>{post.comments.length}</p>
                                <FaComment size={20} style={{ cursor: 'pointer' }} />
                            </div>
                        </div>
                        <div>
                            <FaBookmark size={20} style={{ cursor: 'pointer' }} />
                        </div>
                    </div>
                </div>}
        </div>
    );
};

export default Card;