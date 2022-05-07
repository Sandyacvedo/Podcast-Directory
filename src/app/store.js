import { configureStore } from "@reduxjs/toolkit";

//Persiter store
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";

//import reducers
import podcastDashboardReducer from "../feactures/podcast/podcastDashboardSlice";
import podcastCategoryReducer from "../feactures/podcastCategory/podcastCategorySlice";
import themeReducer from "../feactures/theme/themeSlice";

const reducers = combineReducers({
  podcastDashboard: podcastDashboardReducer,
  podcastCategory: podcastCategoryReducer,
  theme: themeReducer,
});

const persistConfig = {
  key: "root",
  whitelist: ["theme", "podcastDashboard"],
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore(
    {
  reducer: persistedReducer,
  devTools: false
}, 
);
