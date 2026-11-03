const jwt = require('jsonwebtoken')
const Usuario = require('../models/Usuario')

const proteger = async (req, res, next) => {
  const header = req.headers.authorization

  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ mensaje: 'No autorizado: falta el token' })
  }

  try {
    const token = header.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const usuario = await Usuario.findById(decoded.id).select('-password')
    if (!usuario) {
      return res.status(401).json({ mensaje: 'No autorizado: usuario no existe' })
    }

    req.usuario = usuario
    next()
  } catch (error) {
    return res.status(401).json({ mensaje: 'Token inválido o expirado' })
  }
}

module.exports = { proteger }