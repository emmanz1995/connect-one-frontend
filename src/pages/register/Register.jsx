import React, { useState } from 'react'
import './register.scss'
import { FaSignInAlt } from 'react-icons/fa'
import { AuthService } from '../../service/auth'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [dob, setDob] = useState('')
    const [password, setPassword] = useState('')
    const [avatar, setAvatar] = useState('')
    const navigate = useNavigate()

    const handleRegister = async (evt) => {
        evt.preventDefault()
        try {
            const formData = {
                name: name,
                username: username,
                email: email,
                dob: dob,
                password: password,
                avatar: avatar
            }
            await AuthService.onSignup(formData)
            navigate('/')
        } catch(err) {
            const errorMessage = (err.response && err.response.data && err.response.data.msg) || err || err.msg.toString()
            console.log(errorMessage)
        }
    }
    const handleChangeImage = (evt) => {
        let File = new FileReader()
        File.readAsDataURL(evt.target.files[0])
        File.onload = () => {
            if(File.readyState === 2) {
                setAvatar(File?.result)
            }
        }
    }
    return (
        <div className="register">
            <div className="register__background">
                <div className="register__info">
                    <div className="register__img__wrapper">
                        <img className="register__img" src="/assets/undraw_authentication.svg" alt="" width="600" height="400" />
                    </div>
                </div>
                {/*<hr/>*/}
                <div className="register__main">
                    <span className="register__header">
                        <FaSignInAlt size={20} />
                        <h3 className="login__title">Register</h3>
                    </span>
                    <form className="register__form" onSubmit={handleRegister}>
                        <div className="register__nameWrapper">
                            <input type="text" className="input" placeholder="Write your Name" name="name" value={name} onChange={(evt) => setName(evt.target.value)} />
                            <input type="text" className="input" placeholder="Write your Username" name="username" value={username} onChange={(evt) => setUsername(evt.target.value)}  />
                        </div>
                        <input type="text" className="register__input" placeholder="Write your Email" name="email" value={email} onChange={(evt) => setEmail(evt.target.value)}  />
                        <input type="date" className="register__input" placeholder="Write your Birthday" name="dob" value={dob} onChange={(evt) => setDob(evt.target.value)}  />
                        <input type="file" accept="image/*" onChange={handleChangeImage} />
                        <input type="password" className="register__input" placeholder="Write your Password" name="password" value={password} onChange={(evt) => setPassword(evt.target.value)}  />
                        <button type="submit" className="register__btn">Sign Up</button>
                        <hr />
                        <span>
                            <p className="register__text">Have an account already? <a className="register__link" href="/">Sign In Now</a></p>
                        </span>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register