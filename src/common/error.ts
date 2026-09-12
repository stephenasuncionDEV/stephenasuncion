type ErrorDetails = {
  response?: { data?: { message?: string; error?: { message?: string } } };
  request?: { data?: { message?: string } };
  raw?: { message?: string };
  message?: string;
};

const errorHandler = (err: unknown, isSilent = false) => {
  if (!err) return err;
  if (!isSilent) {
    console.error(err);
  }
  const error = err as ErrorDetails;
  let msg: string | undefined = "Something wrong occured";
  if (error.response) {
    msg = error.response.data?.message;
    if (!msg) {
      msg = error.response.data?.error?.message;
    }
  } else if (error.request) {
    msg = error.request.data?.message;
  } else if (error.raw) {
    msg = error.raw.message;
  } else {
    msg = error.message;
  }
  return msg;
};

export default errorHandler;
