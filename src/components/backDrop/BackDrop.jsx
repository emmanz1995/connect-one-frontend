import React from 'react'
import './backdrop.scss'

const BackDrop = ({ children }) => {
    return (
        <div className="backdrop">
            {children}
        </div>
    )
}

export default BackDrop