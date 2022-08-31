import React, { useState } from 'react'
import './login.scss'
import { FaSignInAlt } from 'react-icons/fa'
import { AuthService } from '../../service/auth'
import { useNavigate, Navigate } from 'react-router-dom'

const Login = () => {
    const loginValues = {
        email: '',
        password: ''
    }
    const [formValues, setFormValues] = useState(loginValues)
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const handleChange = (evt) => {
        const { name, value } = evt.target
        setFormValues({ ...formValues, [name]: value })
    }
    const handleSignIn = async (evt) => {
        evt.preventDefault()
        const { email, password } = formValues
        try {
            await AuthService.onLogin({ email: email, password: password })
            navigate('/explore')
            setError('')
        } catch(err){
            const errorMessage = (err.response && err.response.data && err.response.data.msg) || err || err.msg.toString()
            console.log(errorMessage)
            setError(errorMessage)
        }
    }

    if(AuthService.getCurrentUser()) {
       return <Navigate to={{ pathname: '/explore' }} />
    }
    return (
        <div className="login">
            <div className="login__background">
                <div className="login__header">
                    <FaSignInAlt size={20} />
                    <h3 className="login__title">Login</h3>
                </div>
                <form className="login__form" onSubmit={handleSignIn}>
                    <input className="login__input" type="text" placeholder="Your Email" name="email" value={formValues.email} onChange={handleChange} required />
                    <input className="login__input" type="password" placeholder="Your Password" name="password" value={formValues.password} onChange={handleChange} required />
                    <button type="submit" className="login__btn">Sign In</button>
                    <hr />
                    <span>
                       <p className="login__text">Haven't got an account? <a className="login__link" href="/register">Join now</a></p>
                    </span>
                </form>
            </div>
        </div>
    );
};

export default Login;