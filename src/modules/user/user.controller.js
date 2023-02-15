import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import UserModel from './user.model.js'

const UserController = {

  async register (req, res, next) {
    
    req.body.password = await bcrypt.hash(req.body.password, 8)

    await UserModel.create(req.body)

    res.status(201).json({
      success: true
    })

  },

  async login (req, res, next) {
    try {
      const { username, password } = req.body
      const user = await UserModel.findOne({
        username: username
      })

      if (!user) {
        const error = new Error('Username not found.')
        error.statusCode = 400
        error.messageError = 'user.controller'
        error.line = '25'
        throw error
      }

      const passwordCompare = await bcrypt.compare(password, user.password)

      if(!passwordCompare) {
        const error = new Error('Password incorrect')
        error.statusCode = 401
        throw error
      }

      // Create payload jwt
      const token = jwt.sign({
        id: user.id,
        username: user.username,
        role: user.role,
      }, process.env.JWT_SECRET, {
        expiresIn: '1d'
      })

      res.status(200).json({
        success: true,
        accessToken: token
      })
    } catch (error) {
      next(error)
    }
  },

  getProfile (req, res, next) {
    res.status(200).json({
      success: true
    })
  }

}

export default UserController