import { ALL_UPLOADED_BOOKS_URL, AVAILABLE_BOOKS_URL, BOOKS_URL, CATEGORIES_URL, CHANGE_BOOK_STATUS_URL, INCOME_URL, UPLOAD_BOOKS_URL } from "../../core/api-routes";
import { handleRequest } from "../../utils/apiService";

export const BookService = {
  createBooks: async (bookData: any) => {
    try {
      const response = await handleRequest(BOOKS_URL, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData), // Ensure body is stringified
      });

      if (!response.ok) {
        let errorMessage = `Bad Request: ${response.statusText}`;

        const data = await response.json();
        errorMessage = data.error || errorMessage;

        return { success: false, error: errorMessage };
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error("Error in createBook service:", error);
      return { success: false, error: "Unexpected error occurred" };
    }
  },

  getBooks: async () => {
    try {
      const response = await handleRequest(
        BOOKS_URL,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("get books failed");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error in getBooks service:", error);
      throw error;
    }
  },

  getCategories: async () => {
    try {
      const response = await handleRequest(
        CATEGORIES_URL,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("get categories failed");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error in getCategories service:", error);
      throw error;
    }
  },

  uploadBook: async (bookData: any) => {
    try {
      const response = await handleRequest(UPLOAD_BOOKS_URL, {
        method: "POST",
        body: bookData,
      });

      if (!response.ok) {
        let errorMessage = `Bad Request: ${response.statusText}`;

        const data = await response.json();
        errorMessage = data.error || errorMessage;

        return { success: false, error: errorMessage };
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error("Error in createBook service:", error);
      return { success: false, error: "Unexpected error occurred" };
    }
  },

  getAllUploadedBooks: async () => {
    try {
      const response = await handleRequest(
        ALL_UPLOADED_BOOKS_URL,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("get categories failed");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error in getCategories service:", error);
      throw error;
    }
  },

  changeBookStatus: async (bookId: any) => {
    try {
      const response = await handleRequest(CHANGE_BOOK_STATUS_URL, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookId),
      });

      if (!response.ok) {
        let errorMessage = `Bad Request: ${response.statusText}`;

        const data = await response.json();
        errorMessage = data.error || errorMessage;

        return { success: false, error: errorMessage };
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error("Error in update book service:", error);
      return { success: false, error: "Unexpected error occurred" };
    }
  },

  allAvailableBooksByCategory: async () => {
    try {
      const response = await handleRequest(
        AVAILABLE_BOOKS_URL,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("get books failed");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error in getBooks service:", error);
      throw error;
    }
  },

  getIncomeByMOnth: async () => {
    try {
      const response = await handleRequest(
        INCOME_URL,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("get books failed");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error in getBooks service:", error);
      throw error;
    }
  },

};
