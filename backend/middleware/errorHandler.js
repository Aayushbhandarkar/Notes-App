const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // Log full error in server console

  // Set status code, default to 500 if not set
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Something went wrong',
    // Optional: only show stack trace in development
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

// Default export so import errorHandler works
export default errorHandler;