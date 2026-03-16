const axios = require('axios')

const TICKET = 'E4078303-4BEE-4C7C-8D28-D2FDDE91007E'
const URL = `https://api.mercadopublico.cl/servicios/v1/publico/licitaciones.json?fecha=11032026&ticket=${TICKET}`

axios.get(URL)
    .then(respuesta => {
        const datos = respuesta.data
        const licitaciones = datos.Listado

        // Palabras clave de tu rubro
        const palabrasClave = ['web', 'digital', 'software', 'aplicación', 'plataforma', 'desarrollo', 'programación', 'sitio', 'portal', 'app', 'página']

        const palabrasClaveArtes = ['teatro', 'artes escénicas', 'escénico', 'espectáculo', 'cultural', 'producción', 'obra', 'danza', 'música', 'festival', 'difusión cultural', 'animación']
        // Filtramos publicadas Y que contengan alguna palabra clave
        const publicadas = licitaciones.filter(l => l.CodigoEstado === 5)

        const relevantes = publicadas.filter(l => {
            const nombre = l.Nombre.toLowerCase()
            return palabrasClave.some(palabra => nombre.includes(palabra))
        })

        console.log('Total hoy:', licitaciones.length)
        console.log('Publicadas:', publicadas.length)
        console.log('Relevantes para tu rubro:', relevantes.length)
        console.log('\nLicitaciones encontradas:')
        relevantes.forEach(l => {
            console.log(`- [${l.CodigoExterno}] ${l.Nombre} | Cierre: ${l.FechaCierre}`)
        })
    })

    .catch(error => {
        console.log('Error:', error.message)
    })