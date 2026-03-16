const pool = require('../db/conexion')
const { obtenerListadoDiario, obtenerDetalle, filtrarPorPerfil } = require('../services/licitacionesService')

// Obtiene licitaciones filtradas por perfil
const getLicitacionesPorPerfil = async (req, res) => {
    const { perfil } = req.params

    try {
        // Buscamos el perfil en la base de datos
        const resultado = await pool.query(
            'SELECT * FROM perfiles WHERE nombre = $1',
            [perfil]
        )

        if (resultado.rows.length === 0) {
            return res.status(404).json({ mensaje: 'Perfil no encontrado' })
        }

        const palabrasClave = resultado.rows[0].palabras_clave

        // Consultamos la API y filtramos
        const listado = await obtenerListadoDiario()
        const relevantes = filtrarPorPerfil(listado, palabrasClave)

        res.json({
            perfil,
            total: relevantes.length,
            licitaciones: relevantes
        })

    } catch (error) {
        console.error(error.message)
        res.status(500).json({ mensaje: 'Error al obtener licitaciones' })
    }
}

// Obtiene el detalle de una licitación específica
const getDetalle = async (req, res) => {
    const { codigo } = req.params

    try {
        const detalle = await obtenerDetalle(codigo)
        res.json(detalle)
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ mensaje: 'Error al obtener detalle' })
    }
}

module.exports = {
    getLicitacionesPorPerfil,
    getDetalle
}