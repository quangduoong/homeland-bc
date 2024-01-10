const internalErrorResponse = (res, error) => {
  console.log(error);

  return res.status(500).json({
    success: false,
    message: error.message,
  });
};

module.exports = internalErrorResponse;
