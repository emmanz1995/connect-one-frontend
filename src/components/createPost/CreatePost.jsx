import React from 'react'

const CreatePost = () => {
    return (
        <div className="createPost">
            <form>
                <textarea name="content" id="" cols="30" rows="5" placeholder="Whats on your mind?" className="createPost__input" value={content} onChange={(evt) => setContent(evt.target.value)} />
                <input type="file" id="yourBtn" onChange={handleChange} /> <br /> <br />
                <button type="submit" className="post-btn" onClick={postDetails} disabled={isLoading}>{isLoading ? 'Loading...' : 'Create Post'}</button>
            </form>
        </div>
    )
}

export default CreatePost