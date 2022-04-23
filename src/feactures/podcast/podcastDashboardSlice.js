import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import API from '../../api/API_PODCAST';

const initialState = {
    podcastList : [],
    podcastSelected : [],
    podcastSearch: [],
    loading : false
};

export const getPodcastList = createAsyncThunk (
    'podcastDashboard/getPodcastList',
    async () => {
        const response = await API.get('/podcasts/trending?max=10&lang=en');

          const { status, feeds, count } = response.data;
          const podcast = {'status': status, 'feeds': feeds, 'count': count}
          return podcast;
     
    }
);

export const getpodcastSearch = createAsyncThunk(
  "podcastDashboard/getpodcastSearch",
  async (query, { rejectWithValue }) => {
    try {
      const response = await API.get(`/search/byterm?q=${encodeURI( query )}&lang=en&max=30&pretty`);
  
      const { feeds } = response.data;
  
      return feeds;
    }
    catch (error) {
      console.log('error ---> \n\n\n',rejectWithValue(error.response.data));
      return rejectWithValue(error.response.data)
    }
  }
);

export const getpodcastLink = createAsyncThunk(
  "podcastDashboard/getpodcastLink",
  async (query, { rejectWithValue }) => {
    try {
      const response = await API.get(`/podcasts/byitunesid?id=${encodeURI( query )}&pretty`);
  
      const { feed } = response.data;
      console.log('link -->', feed.link);
      return feed.link;
    }
    catch (error) {
      console.log('error ---> \n\n\n',rejectWithValue(error.response.data));
      return rejectWithValue(error.response.data)
    }
  }
);

export const podcastDashboardSlice = createSlice({
  name: "podcastDashboard",
  initialState: initialState,
  reducers: {
    setPodcastSelected: (state, {payload}) => {
      state.podcastSelected = payload;
    }
  },
  extraReducers: {
    // podcastlist
    [getPodcastList.pending]: (state) => {
      state.loading = true;
    },
    [getPodcastList.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.podcastList = payload;
    },
    [getPodcastList.rejected]: (state) => {
      state.loading = false;
    },
    // podcastSearch
    [getpodcastSearch.pending]: (state) => {
      state.loading = true;
    },
    [getpodcastSearch.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.podcastSelected = payload;
    },
    [getpodcastSearch.rejected]: (state, {payload}) => {
      state.podcastSearch = []
      state.loading = false;
    },
    // getpodcastlink
    [getpodcastLink.pending]: (state) => {
      state.loading = true;
    },
    [getpodcastLink.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.podcastSelected.url = payload;
    },
    [getpodcastLink.rejected]: (state, {payload}) => {
      state.podcastSelected = []
      state.loading = false;
    },
  },
});
export const { setPodcastSelected  } = podcastDashboardSlice.actions;

export default podcastDashboardSlice.reducer;

