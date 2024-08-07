import { AppDispatch } from "../../app/store";
import { BookService } from "./bookService";
import { bookFailure, bookStart, createBooksSuccess, getBooksSuccess, getCategoriesSuccess, uploadBookSuccess } from "./bookSlice";

export const createBook =
  (data: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(bookStart());

      const response = await BookService.createBook(data);

      if (response.success) {
        dispatch(createBooksSuccess(response.data));
      } else {
        dispatch(bookFailure(response.error || "Unknown error"));
      }
    } catch (error) {
      dispatch(bookFailure("Unknown error"));
    }
  };

export const getBooks = () => async (dispatch: AppDispatch) => {
    try {
      dispatch(bookStart());
      const response = await BookService.getBooks();
      dispatch(getBooksSuccess(response));
    } catch (error) {
      dispatch(bookFailure(error));
    }
  };

export const getCategories = () => async (dispatch: AppDispatch) => {
    try {
      dispatch(bookStart());
      const response = await BookService.getCategories();
      dispatch(getCategoriesSuccess(response));
    } catch (error) {
      dispatch(bookFailure(error));
    }
  };

export const uploadBook =
  (data: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(bookStart());

      const response = await BookService.uploadBook(data);

      if (response.success) {
        dispatch(uploadBookSuccess(response.data));
      } else {
        dispatch(bookFailure(response.error || "Unknown error"));
      }
    } catch (error) {
      dispatch(bookFailure("Unknown error"));
    }
  };

