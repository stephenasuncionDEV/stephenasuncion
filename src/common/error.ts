/* eslint-disable  @typescript-eslint/no-explicit-any */
const errorHandler = (err: any, isSilent = false) => {
  if (!err) return err;
  if (!isSilent) {
    console.error(err);
  }
  let msg = "[ERROR] Something wrong occured";
  if (err.response) {
    msg = err.response.data?.message;
    if (!msg) {
      msg = err.response.data?.error?.message;
    }
  } else if (err.request) {
    msg = err.request.data?.message;
  } else if (err.raw) {
    msg = err.raw.message;
  } else {
    msg = err.message;
  }
  return msg;
};

export default errorHandler;
