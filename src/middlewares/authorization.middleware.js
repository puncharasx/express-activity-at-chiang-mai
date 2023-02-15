const AuthorizationMiddleWare = (roles) => {
  return (req, res, next) => {
    try {
      const { user } = req

      if(!roles.includes(user.role)) {
         const error = new Error('Unauthorized')
         error.statusCode = 401
         throw error
      }
      
      next()
    } catch (error) {
      next(error)
    }

  }

}

export default AuthorizationMiddleWare