const BASE_URL = process.env.REACT_APP_BASE_URL

// AUTH ENDPOINTS
export const endpoints = {
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
    GET_PROFILE: BASE_URL + "/auth/getProfile"
}

// Tag Endpoints
export const TagEndpoints = {
    TAGS_API: BASE_URL + "/post/getAllTags"
}

// Post Endpoints
export const PostEndPoints ={
    GETPost_API: BASE_URL + "/post/getAllPosts",
    CREATE_POST: BASE_URL + "/post/createPost"
}