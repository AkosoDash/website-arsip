const error_handler = (res, message, status_code) => {
  return res.status(status_code).json({ message });
};

export default error_handler;
