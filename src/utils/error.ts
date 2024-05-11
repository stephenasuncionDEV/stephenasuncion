/* eslint-disable  @typescript-eslint/no-explicit-any */
const errorHandler = (err: any) => {
  let errorMessage = "Something went wrong.";

  if (err.response) {
    errorMessage =
      err.response.data?.message ??
      err.response.data?.error?.message ??
      errorMessage;
  } else if (err.request) {
    errorMessage = err.request.data?.message ?? errorMessage;
  } else if (err.raw?.message) {
    errorMessage = err.raw.message;
  } else if (err.message) {
    errorMessage = err.message;
  }

  return errorMessage;
};

export default errorHandler;
