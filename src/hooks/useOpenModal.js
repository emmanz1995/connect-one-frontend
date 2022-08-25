import React, { useState } from 'react'

const useOpenModal = () => {
    const [reveal, setReveal] = useState(false)
    const handleReveal = () => {
        setReveal(true)
    }
    const handleHide = () => setReveal(false)

    return { reveal, setReveal, handleReveal, handleHide }
}

export default useOpenModal