const ErrorHandlerMiddleWare = (err, req, res, next) => {

  const statusCode = err.statusCode || 500
  const code = err.code
  
  console.log(err.messageError)
  console.log(err.line)

  return res.status(statusCode).json({
    success: false,
    message: err.message
  })

}

export default ErrorHandlerMiddleWare