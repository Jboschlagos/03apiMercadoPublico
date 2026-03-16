const axios = require('axios')

const TICKET = 'E4078303-4BEE-4C7C-8D28-D2FDDE91007E'

// Usamos la plataforma gestión pedagógica — parece la más interesante
const CODIGO = '4475-9-LE26'

const URL = `https://api.mercadopublico.cl/servicios/v1/publico/licitaciones.json?codigo=${CODIGO}&ticket=${TICKET}`

axios.get(URL)
    .then(respuesta => {
        const licitacion = respuesta.data.Listado[0]
        console.log(JSON.stringify(licitacion, null, 2))
    })
    .catch(error => {
        console.log('Error:', error.message)
    })