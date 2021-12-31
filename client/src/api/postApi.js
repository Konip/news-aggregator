import axios from "axios"

export const getPost = async (str) => {
    const { data } = await axios.get(process.env.REACT_APP_SERVER_URL+ "/" + str)
    return data
}

export const getAllPosts = async () => {
    const { data } = await axios.get(process.env.REACT_APP_SERVER_URL+ "/all")
    return data
}