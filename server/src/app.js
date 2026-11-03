require('dotenv').config()
const express = require('express')
const cors = require('cors')
const conectarDB = require('./config/db')

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ mensaje: 'API Dulce Aroma funcionando' })
})

app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/pasteles', require('./routes/pastelRoutes'))

const PORT = process.env.PORT || 3001

conectarDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`)
  })
})