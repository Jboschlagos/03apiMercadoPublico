const axios = require('axios')
require('dotenv').config()

const TICKET = process.env.TICKET_API
const BASE_URL = 'https://api.mercadopublico.cl/servicios/v1/publico/licitaciones.json'

// Obtiene el listado del día en formato DDMMYYYY
const obtenerFechaHoy = () => {
    const hoy = new Date()
    const dia = String(hoy.getDate()).padStart(2, '0')
    const mes = String(hoy.getMonth() + 1).padStart(2, '0')
    const anio = hoy.getFullYear()
    return `${dia}${mes}${anio}`
}

// Consulta el listado diario de licitaciones
const obtenerListadoDiario = async () => {
    const fecha = obtenerFechaHoy()
    const url = `${BASE_URL}?fecha=${fecha}&ticket=${TICKET}`
    const respuesta = await axios.get(url)
    return respuesta.data.Listado
}

// Consulta el detalle de una licitación por código
const obtenerDetalle = async (codigo) => {
    const url = `${BASE_URL}?codigo=${codigo}&ticket=${TICKET}`
    const respuesta = await axios.get(url)
    return respuesta.data.Listado[0]
}

// Filtra licitaciones por palabras clave de un perfil
const filtrarPorPerfil = (licitaciones, palabrasClave) => {
    return licitaciones.filter(l => {
        const nombre = l.Nombre.toLowerCase()
        return palabrasClave.some(palabra => nombre.includes(palabra.toLowerCase()))
    })
}

module.exports = {
    obtenerListadoDiario,
    obtenerDetalle,
    filtrarPorPerfil
}