import { AuthService } from '../service/auth'

const AuthHeaderUtil = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    if(user && user.token) {
        return { Authorization: `Bearer ${user.token}` }
    } else {
        return {}
    }
}

export default AuthHeaderUtil