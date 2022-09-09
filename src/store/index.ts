import { combineReducers, configureStore } from "@reduxjs/toolkit";
import taskSlice from "./slices/taskSlice";

const rootReducer = combineReducers({
  taskSlice,
});

export const setupStore = () => {
  return configureStore({
    devTools: true,
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
