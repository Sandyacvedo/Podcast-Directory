import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from '../../api/API_PODCAST';

const initialState = {
  categories: [],
  loading: false,
  error: []
};

export const getPodcastCategory = createAsyncThunk(
  "podcastCategory/getPodcastCategory",
  async (name, { rejectWithValue }) => {
    try {
      const response = await API.get(`/podcasts/trending?cat=${encodeURI( name )}&max=10&lang=en&pretty`);
  
      const { feeds } = response.data;
      const obj = {
        'name' : name,
        'data' : feeds
      }
  
      return obj;
    }
    catch (error ) {
      return rejectWithValue(error.response.data)
    }
  }
);

export const podcastCategory = createSlice({
    name: 'podcastCategory',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getPodcastCategory.pending, (state) => {
            state.loading = true
        });
        builder.addCase(getPodcastCategory.fulfilled, (state, { payload }) => {
            state.loading = false;
            const { name, data } = payload; // desestructuring of payload
            state.categories.push(payload);
        });
        builder.addCase(getPodcastCategory.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload
            // state.podcastCategory = payLoad;
        });
    }
})


export default podcastCategory.reducer;