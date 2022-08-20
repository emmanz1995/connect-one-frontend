import axios from 'axios'
import AuthHeaderUtil from '../util/authHeaderUtil'

const getAllUsers = async () => {
    const response = await axios.get('/api/user/all', { headers: AuthHeaderUtil() })
    return response.data
}

const getMe = async () => {
    const response = await axios.get('/api/user', { headers: AuthHeaderUtil() })
    return response.data
}

export const UserService = {
    getAllUsers,
    getMe
}