import { configureStore } from '@reduxjs/toolkit';
import roleReducer from "../features/role/roleSlice"
import userReducer from "../features/user/userSlice";
import bookReducer from "../features/book/bookSlice";


const store = configureStore({
  reducer: {
    user: userReducer,
    role: roleReducer,
    book: bookReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
