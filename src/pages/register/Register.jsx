import React from 'react'
import './register.scss'
import { FaSignInAlt } from 'react-icons/fa'

const Register = () => {
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
                    <form className="register__form">
                        <div className="register__nameWrapper">
                            <input type="text" className="input" placeholder="Write your Name" />
                            <input type="text" className="input" placeholder="Write your Username" />
                        </div>
                        <input type="text" className="register__input" placeholder="Write your Email" />
                        <input type="date" className="register__input" placeholder="Write your Birthday" />
                        <input type="password" className="register__input" placeholder="Write your Password" />
                        <button className="register__btn">Sign Up</button>
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