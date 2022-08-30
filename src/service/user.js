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

const onFollowUser = async (id, _) => {
    const response = await axios.put(`/api/user/follow/${id}`, _, { headers: AuthHeaderUtil() })
    return response.data
}

const onUnFollowUser = async (id, _) => {
    const response = await axios.put(`/api/user/unfollow/${id}`, _, { headers: AuthHeaderUtil() })
    console.log(id)
    return response.data
}

export const UserService = {
    getAllUsers,
    getMe,
    onFollowUser,
    onUnFollowUser
}