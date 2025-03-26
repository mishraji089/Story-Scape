// tagsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tags: [],
    loading: false,
    error: null,
};

const tagsSlice = createSlice({
    name: "tags",
    initialState,
    reducers: {
        fetchTagsRequest(state) {
            state.loading = true;
        },
        fetchTagsSuccess(state, action) {
            state.loading = false;
            state.tags = action.payload;
        },
        fetchTagsFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});


export const { fetchTagsRequest, fetchTagsSuccess, fetchTagsFailure } = tagsSlice.actions;

export default tagsSlice.reducer;
