const express = require('express')
const cors = require('cors')
require('dotenv').config()

const licitacionesRouter = require('./src/routes/licitaciones')

const app = express()
const PORT = process.env.PORT || 3000

// Middlewares
app.use(cors())
app.use(express.json())

// Rutas
app.use('/api/licitaciones', licitacionesRouter)

// Ruta de prueba
app.get('/', (req, res) => {
    res.json({ mensaje: 'API exploraMP funcionando ✅' })
})

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})