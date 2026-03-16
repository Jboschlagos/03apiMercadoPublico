const express = require('express')
const router = express.Router()
const { getLicitacionesPorPerfil, getDetalle } = require('../controllers/licitacionesController')

router.get('/:perfil', getLicitacionesPorPerfil)
router.get('/:codigo/detalle', getDetalle)

module.exports = router