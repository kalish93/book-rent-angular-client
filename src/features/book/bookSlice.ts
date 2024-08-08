import { createSlice } from "@reduxjs/toolkit";

interface BookState {
  books: any;
  categories: any;
  loading: boolean;
  error: any | null;
  isError: boolean;
  uploadedBooks: any;
  categorizedAvailableBooks: any,
  incomeByMonth: any;
}

const initialState: BookState = {
  books: [],
  categories: [],
  loading: false,
  error: null,
  isError: false,
  uploadedBooks: [],
  categorizedAvailableBooks: [],
  incomeByMonth: {}
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
    getCategorizedAvailableBooksSuccess: (
      state,
      action
    ) => {
      state.categorizedAvailableBooks = action.payload;
      state.loading = false;
    },
    getIncomeByMonthSuccess: (
      state,
      action
    ) => {
      state.incomeByMonth = action.payload;
      state.loading = false;
    },
    getAllUploadedBooksSuccess: (
      state,
      action
    ) => {
      state.uploadedBooks = action.payload;
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

    changeBookStatusSuccess: (state, action) => {
      const updatedbook = action.payload;
      const bookIndex = state.uploadedBooks.findIndex(
        (book: any) => book.id === updatedbook.id
      );
      if (bookIndex !== -1) {
        state.uploadedBooks = state.uploadedBooks.map((book: any) =>
          book.id === updatedbook.id ? updatedbook : book
        );
      } else {
        state.uploadedBooks = [updatedbook, ...state.uploadedBooks];
      }
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
 uploadBookSuccess,
 getAllUploadedBooksSuccess,
 changeBookStatusSuccess,
 getCategorizedAvailableBooksSuccess,
 getIncomeByMonthSuccess
} = bookSlice.actions;

export const selectBook = (state: { book: BookState }) => state.book;

export default bookSlice.reducer;
