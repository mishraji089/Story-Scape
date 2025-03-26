import { endpoints } from '../apis'
import { toast } from "react-hot-toast"
import { setLoading, setToken } from '../../slices/authSlice'
import { apiConnector } from "../apiconnector"
import { setUser } from '../../slices/profileSlice'
import { useSelector } from 'react-redux'
import axios from 'axios'

const BASE_URL = process.env.REACT_APP_BASE_URL


const {
    SIGNUP_API,
    LOGIN_API,
    GET_PROFILE
} = endpoints

export function login(email, password, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST", LOGIN_API, {
                email,
                password,
            })

            console.log("LOGIN API RESPONSE............", response)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("Login Successful")
            dispatch(setToken(response.data.token))
            const userImage = response.data?.user?.image
                ? response.data.user.image
                : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
            dispatch(setUser({ ...response.data.user, image: userImage }))

            localStorage.setItem("token", JSON.stringify(response.data.token))
            localStorage.setItem("user", JSON.stringify(response.data.user))

            navigate("/")
        } catch (error) {
            console.log("LOGIN API ERROR............", error)
            toast.error("Login Failed")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function getProfile(token) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const response = await axios.get(`${BASE_URL}/auth/getProfile`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("GET PROFILE API RESPONSE............", response)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            const userImage = response.data?.user?.image
                ? response.data.user.image
                : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
            dispatch(setUser({ ...response.data.user, image: userImage }))

            localStorage.setItem("user", JSON.stringify(response.data.user))
        } catch (error) {
            console.log("GET PROFILE API ERROR............", error)
            toast.error("Failed to fetch user profile")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}



export function signup(
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    navigate
) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST", SIGNUP_API, {
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
            })

            console.log("SIGNUP API RESPONSE............", response)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Signup Successful")
            navigate("/login")
        } catch (error) {
            console.log("SIGNUP API ERROR............", error)
            toast.error("Signup Failed")
            navigate("/signup")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function logout(navigate) {
    return (dispatch) => {
      dispatch(setToken(null))
      dispatch(setUser(null))
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      toast.success("Logged Out")
      navigate("/")
    }
  }