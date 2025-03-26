import { combineReducers } from "@reduxjs/toolkit"
import authReducer from "../slices/authSlice"
import profileReducer from "../slices/profileSlice"
import tagReducer from "../slices/Tag"

const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    tags:tagReducer,
})

export default rootReducer