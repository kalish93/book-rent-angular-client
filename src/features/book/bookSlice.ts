import { createSlice } from "@reduxjs/toolkit";

interface BookState {
  books: any;
  categories: any;
  loading: boolean;
  error: any | null;
  isError: boolean;
  uploadedBooks: any
}

const initialState: BookState = {
  books: [],
  categories: [],
  loading: false,
  error: null,
  isError: false,
  uploadedBooks: []
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    bookStart: (state) => {
      state.loading = true;
      state.error = null;
      state.isError = false;
    },
    getBooksSuccess: (
      state,
      action
    ) => {
      state.books = action.payload;
      state.loading = false;
    },
    getCategoriesSuccess: (
      state,
      action
    ) => {
      state.categories = action.payload;
      state.loading = false;
    },

    createBooksSuccess: (
      state,
      action
    ) => {
      state.books = [action.payload, ...state.books];
      state.loading = false;
    },

    uploadBookSuccess: (
      state,
      action
    ) => {
      state.uploadedBooks = [action.payload, ...state.uploadedBooks];
      state.loading = false;
    },

    bookFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isError = true;
    },
  },
});

export const {
 bookStart,
 bookFailure,
 getBooksSuccess,
 getCategoriesSuccess,
 createBooksSuccess,
 uploadBookSuccess
} = bookSlice.actions;

export const selectBook = (state: { book: BookState }) => state.book;

export default bookSlice.reducer;
