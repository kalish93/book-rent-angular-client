import { AppDispatch } from "../../app/store";
import { BookService } from "./bookService";
import { bookFailure, bookStart, changeBookStatusSuccess, createBooksSuccess, getAllUploadedBooksSuccess, getBooksSuccess, getCategoriesSuccess, getCategorizedAvailableBooksSuccess, getIncomeByMonthSuccess, uploadBookSuccess } from "./bookSlice";

export const createBook =
  (bookData: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(bookStart());

      const response = await BookService.createBooks(bookData);

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

export const getAllUploadedBooks = () => async (dispatch: AppDispatch) => {
    try {
      dispatch(bookStart());
      const response = await BookService.getAllUploadedBooks();
      dispatch(getAllUploadedBooksSuccess(response));
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
export const allAvailableBooksByCategory = () => async (dispatch: AppDispatch) => {
    try {
      dispatch(bookStart());
      const response = await BookService.allAvailableBooksByCategory();
      dispatch(getCategorizedAvailableBooksSuccess(response));
    } catch (error) {
      dispatch(bookFailure(error));
    }
  };
export const getIncomeByMonth = () => async (dispatch: AppDispatch) => {
    try {
      dispatch(bookStart());
      const response = await BookService.getIncomeByMOnth();
      dispatch(getIncomeByMonthSuccess(response));
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

export const changeBookStatus =
  (data: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(bookStart());

      const response = await BookService.changeBookStatus(data);

      if (response.success) {
        dispatch(changeBookStatusSuccess(response.data));
      } else {
        dispatch(bookFailure(response.error || "Unknown error"));
      }
    } catch (error) {
      dispatch(bookFailure("Unknown error"));
    }
  };

