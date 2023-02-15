import jwt from 'jsonwebtoken'

const AuthenticationMiddleWare = (req, res, next) => {

  try {
    const { authorization } = req.headers

    if(!authorization) {

      return res.status(401).json({
        success: false,
        message: 'Unauthorized'   
      })

    }

    const bearerToken = authorization.replace('Bearer ', '')
    
    const data = jwt.verify(bearerToken, process.env.JWT_SECRET)

    req.user = data

    next()
  } catch (error) {
    next(error)
  }
}

export default AuthenticationMiddleWare