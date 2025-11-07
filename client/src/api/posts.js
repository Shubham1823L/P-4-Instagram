import { api } from "./axios";


export const uploadFile = async (file) => {
    const formData = new FormData()
    formData.append("newPost", file)

    try {
        const response = await api.post('/upload/newPost', formData)
        return response
    } catch (error) {
        console.error("error in uploading file")
        return error.response
    }

}

export const publishNewPost = async (data) => {
    try {
        const response = await api.post('/posts', data)
        return response
    } catch (error) {
        console.error("error in publishing new post")
        return error.response
    }
}


export const fetchMyPosts = async (page,limit) => {
    try {
        const response = await api.get(`/posts?page=${page}&limit=${limit}`)
        return response
    } catch (error) {
        console.error("error retreiving myPosts")
        return error.response
    }
}
