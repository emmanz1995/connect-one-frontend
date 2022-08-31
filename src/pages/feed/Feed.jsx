import React, { useEffect } from 'react'
import Layout from '../../components/layout/Layout'
import Navbar from '../../components/navbar/Navbar'
import { useSelector, useDispatch } from 'react-redux'
import { feedPosts } from '../../app/action/postAction'
import Card from '../../components/card/Card'

const Feed = () => {
    const dispatch = useDispatch()
    const { timeline } = useSelector((state) => state.posts)
    useEffect(() => {
        dispatch(feedPosts())
    }, [])

    return (
        <Layout>
            <Navbar />
            <div className="feed">
                <div className="feed__wrapper">
                    {timeline?.length > 0 ? timeline?.map((post) => (
                        <Card post={post} />
                    )) : <p>You need to follow someone to see their on here</p>}
                </div>
            </div>
        </Layout>
    );
};

export default Feed;