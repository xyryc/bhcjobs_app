export const getErrorMessage = (error: any): string => {
  if (error?.data?.status === false) {
    if (error.data.message) {
      return error.data.message;
    }

    if (error.data.error && typeof error.data.error === "object") {
      const firstField = Object.keys(error.data.error)[0];
      if (firstField && Array.isArray(error.data.error[firstField])) {
        return error.data.error[firstField][0];
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
