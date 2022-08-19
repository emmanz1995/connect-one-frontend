import axios from 'axios'

const onLogin = async(formData) => {
    const response = await axios.post('/api/auth', formData)
    localStorage.setItem('user', JSON.stringify(response.data))
    console.log(response.data)
    return response.data
}
const onSignup = async(formData) => {
    const response = await axios.post('/api/user', formData)
    return response.data
}
function getCurrentUser() {
    const userInfo = localStorage.getItem('user')
    if(userInfo) {
        return JSON.parse(userInfo)
    }
}

function onSignout() {
    localStorage.removeItem('user')
}

export const AuthService = {
    onLogin,
    onSignup,
    getCurrentUser,
    onSignout
}