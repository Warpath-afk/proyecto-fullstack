const express = require('express')
const { proteger } = require('../middlewares/authMiddleware')
const { listar, crear, actualizar, eliminar } = require('../controllers/pastelController')

const router = express.Router()

router.use(proteger)

router.get('/', listar)
router.post('/', crear)
router.put('/:id', actualizar)
router.delete('/:id', eliminar)

module.exports = router