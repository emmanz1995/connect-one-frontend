import React from 'react'
import { FaHome, FaSignOutAlt, FaCompass } from 'react-icons/fa'
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
                    <li><a className="navbar__link" href="/feed"><FaHome size={20} /></a></li>
                    <li><a className="navbar__link" href="/explore"><FaCompass size={20} /></a></li>
                    <li><a className="navbar__link" href=""><FaSignOutAlt onClick={handleSignout} size={20} /></a></li>
                    <li>
                        <a className="navbar__link" href="/profile" style={{ color: '#FAFBFF', width: '100%' }}>
                            <div>
                                <div className="avatar-wrapper">
                                    <img src={currentUser?.avatar?.url} alt="" width="600" height="400" className="avatar" />
                                </div>
                            </div>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar