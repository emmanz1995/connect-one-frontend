import React from 'react'
import { FaHome, FaUserCircle, FaSignOutAlt } from 'react-icons/fa'
import './navbar.scss'
import { AuthService } from '../../service/auth'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate()
    const currentUser = AuthService.getCurrentUser()
    const handleSignout = () => {
        AuthService.onSignout()
        navigate('/')
    }
    return (
        <div className="navbar">
            <nav className="navbar__wrapper">
                <div className="navbar__header">
                    <h2 className="navbar__title">Connect One</h2>
                </div>
                <ul className="navbar__ul">
                    <li><a className="navbar__link" href=""><FaHome size={30} /></a></li>
                    <li><a className="navbar__link" href=""><FaUserCircle size={30} /></a></li>
                    <li><a className="navbar__link" href=""><FaSignOutAlt onClick={handleSignout} size={30} /></a></li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar