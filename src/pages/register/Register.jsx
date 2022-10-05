import React, { useState } from 'react'
import './register.scss'
import { FaSignInAlt } from 'react-icons/fa'
import { AuthService } from '../../service/auth'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { Formik } from 'formik'

const initialValues = {
    name: '',
    username: '',
    email: '',
    dob: '',
    password: '',
    confirmPassword: ''
}

const validationSchema = yup.object().shape({
    name: yup.string().required('Full Name is Required!'),
    username: yup.string().required('Username is Required!'),
    email: yup.string().required('Email is Required!').email('Email must be a valid email address!'),
    dob: yup.date().required('Date of Birth is Required!'),
    password: yup.string().required('Password is Required!').min(6).max(20),
    confirmPassword: yup.string().label('Confirm Password').required('Confirm Password is Required!').oneOf([yup.ref('password'), null], 'Passwords need to match!')
})

const Register = () => {
    const [avatar, setAvatar] = useState('')
    const navigate = useNavigate()

    const handleRegister = async (value) => {
        try {
            const formData = {
                name: value.name,
                username: value.username,
                email: value.email,
                dob: value.dob,
                password: value.password,
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
        <Formik initialValues={initialValues} onSubmit={handleRegister} validationSchema={validationSchema}>
            {({ values, touched, errors, handleChange, handleSubmit }) => (
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
                            <form className="register__form" onSubmit={handleSubmit}>
                                <div className="register__nameWrapper">
                                    <div>
                                        <input type="text" className="input" placeholder="Write your Name" name="name" value={values.name} onChange={handleChange} />
                                        {errors.name && touched.name ? <p>{errors.name}</p> : null}
                                    </div>
                                    <div>
                                        <input type="text" className="input" placeholder="Write your Username" name="username" value={values.username} onChange={handleChange} />
                                        {errors.username && touched.username ? <p>{errors.username}</p> : null}
                                    </div>
                                </div>
                                <input type="text" className="register__input" placeholder="Write your Email" name="email" value={values.email} onChange={handleChange} />
                                {errors.email && touched.email ? <p>{errors.email}</p> : null}
                                <input type="date" className="register__input" placeholder="Write your Birthday" name="dob" value={values.dob} onChange={handleChange} />
                                {errors.dob && touched.dob ? <p>{errors.dob}</p> : null}
                                <input type="file" accept="image/*" onChange={handleChangeImage} />
                                <input type="password" className="register__input" placeholder="Write your Password" name="password" value={values.password} onChange={handleChange} />
                                {errors.password && touched.password ? <p>{errors.password}</p> : null}
                                <input type="password" className="register__input" placeholder="Confirm your Password" name="confirmPassword" value={values.confirmPassword} onChange={handleChange} />
                                {errors.confirmPassword && touched.confirmPassword ? <p>{errors.confirmPassword}</p> : null}
                                <button type="submit" className="register__btn">Sign Up</button>
                                <hr />
                                <span>
                                    <p className="register__text">Have an account already? <a className="register__link" href="/">Sign In Now</a></p>
                                </span>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </Formik>

    )
}

export default Register