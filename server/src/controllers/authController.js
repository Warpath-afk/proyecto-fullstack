const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Usuario = require('../models/Usuario')

const generarToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' })

const registrar = async (req, res) => {
  try {
    const { nombre, email, password } = req.body

    if (!nombre || !email || !password) {
      return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' })
    }
    if (password.length < 6) {
      return res.status(400).json({ mensaje: 'La contraseña debe tener al menos 6 caracteres' })
    }

    const existe = await Usuario.findOne({ email: email.toLowerCase() })
    if (existe) {
      return res.status(400).json({ mensaje: 'El correo ya está registrado' })
    }

    const hash = await bcrypt.hash(password, 10)
    const usuario = await Usuario.create({ nombre, email, password: hash })

    res.status(201).json({
      _id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      token: generarToken(usuario._id),
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ mensaje: 'Error al registrar el usuario' })
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ mensaje: 'Email y contraseña son obligatorios' })
    }

    const usuario = await Usuario.findOne({ email: email.toLowerCase() })
    const coincide = usuario && (await bcrypt.compare(password, usuario.password))

    if (!coincide) {
      return res.status(401).json({ mensaje: 'Credenciales incorrectas' })
    }

    res.json({
      _id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      token: generarToken(usuario._id),
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ mensaje: 'Error al iniciar sesión' })
  }
}

module.exports = { registrar, login }