const mongoose = require('mongoose')
const Pastel = require('../models/Pastel')

const listar = async (req, res) => {
  try {
    const pasteles = await Pastel.find({ usuario: req.usuario._id }).sort({ createdAt: -1 })
    res.json(pasteles)
  } catch (error) {
    console.error(error)
    res.status(500).json({ mensaje: 'Error al obtener los pasteles' })
  }
}

const crear = async (req, res) => {
  try {
    const { nombre, descripcion, precio, categoria, stock } = req.body

    if (!nombre || !descripcion || precio === undefined || !categoria || stock === undefined) {
      return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' })
    }
    if (Number(precio) <= 0) {
      return res.status(400).json({ mensaje: 'El precio debe ser mayor a 0' })
    }
    if (Number(stock) < 0) {
      return res.status(400).json({ mensaje: 'El stock no puede ser negativo' })
    }

    const pastel = await Pastel.create({
      nombre,
      descripcion,
      precio,
      categoria,
      stock,
      usuario: req.usuario._id,
    })

    res.status(201).json(pastel)
  } catch (error) {
    console.error(error)
    res.status(500).json({ mensaje: 'Error al crear el pastel' })
  }
}

const actualizar = async (req, res) => {
  try {
    const { id } = req.params
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ mensaje: 'Id inválido' })
    }

    const pastel = await Pastel.findOneAndUpdate(
      { _id: id, usuario: req.usuario._id },
      req.body,
      { new: true, runValidators: true }
    )

    if (!pastel) {
      return res.status(404).json({ mensaje: 'Pastel no encontrado' })
    }
    res.json(pastel)
  } catch (error) {
    console.error(error)
    res.status(500).json({ mensaje: 'Error al actualizar el pastel' })
  }
}

const eliminar = async (req, res) => {
  try {
    const { id } = req.params
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ mensaje: 'Id inválido' })
    }

    const pastel = await Pastel.findOneAndDelete({ _id: id, usuario: req.usuario._id })

    if (!pastel) {
      return res.status(404).json({ mensaje: 'Pastel no encontrado' })
    }
    res.json({ mensaje: 'Pastel eliminado' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ mensaje: 'Error al eliminar el pastel' })
  }
}

module.exports = { listar, crear, actualizar, eliminar }