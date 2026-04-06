import type {
  LoginErrorResponse,
  RegisterErrorResponse,
} from "../store/services/authApi";

export const getErrorMessage = (error: any): string => {
  if (error?.data?.status === false && error?.data?.error) {
    const errors = error.data.error as
      | RegisterErrorResponse["error"]
      | LoginErrorResponse["error"]
      | string;

    if (typeof errors === "string") {
      return errors;
    }

    if (errors && typeof errors === "object") {
      const firstField = Object.keys(errors)[0];
      if (firstField && Array.isArray(errors[firstField])) {
        return errors[firstField][0];
      }
    }
  }

  if (error?.status === "FETCH_ERROR") {
    return "Network error. Please check your internet connection.";
  }

  if (error?.status === 401) {
    return "Invalid credentials. Please try again.";
  }

  if (error?.status === 500) {
    return "Server error. Please try again later.";
  }

  return "An unexpected error occurred. Please try again.";
};
