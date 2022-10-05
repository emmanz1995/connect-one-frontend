import React, { useState } from 'react'
import './login.scss'
import { FaSignInAlt } from 'react-icons/fa'
import { AuthService } from '../../service/auth'
import { useNavigate, Navigate } from 'react-router-dom'
import * as yup from 'yup'
import { Formik } from 'formik'

const initialValues = {
    email: '',
    password: ''
}

const validationSchema = yup.object().shape({
    email: yup.string().required('Email is Required!').email('Email must be a valid email address!'),
    password: yup.string().required('Password is Required!').min(6).max(20)
})

const Login = () => {
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const handleSignIn = async (values) => {
        const { email, password } = values
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
        <Formik onSubmit={handleSignIn} initialValues={initialValues} validationSchema={validationSchema}>
            {({ handleSubmit, values, handleChange, touched, errors }) => (
                <div className="login">
                    <div className="login__background">
                        <div className="login__header">
                            <FaSignInAlt size={20} />
                            <h3 className="login__title">Login</h3>
                        </div>
                        <form className="login__form" onSubmit={handleSubmit}>
                            <input className={errors.email ? "login__error": "login__input"} type="text" placeholder="Your Email" name="email" value={values.email} onChange={handleChange} />
                            {errors.email && touched.email ? <p className='login__errorMsg'>{errors.email}</p> : null}
                            <input className={errors.password ? "login__error": "login__input"} type="password" placeholder="Your Password" name="password" value={values.password} onChange={handleChange} />
                            {errors.password && touched.password ? <p className="login__errorMsg">{errors.password}</p> : null}
                            <button type="submit" className="login__btn">Sign In</button>
                            <hr />
                            <span>
                       <p className="login__text">Haven't got an account? <a className="login__link" href="/register">Join now</a></p>
                    </span>
                        </form>
                    </div>
                </div>
            )}
        </Formik>
    );
};

export default Login;