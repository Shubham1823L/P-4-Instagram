import { api } from "./axios"

export const uploadProfilePic = async (file) => {
    const formData = new FormData()
    formData.append('profilePic', file)
    try {
        const response = await api.post('/upload/profilePic', formData)
        return response
    } catch (error) {
        console.error('error uploading profilePic')
        return error.response
    }
}
