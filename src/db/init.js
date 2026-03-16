const pool = require('./conexion')

const init = async () => {
    try {
        // Tabla perfiles
        await pool.query(`
      CREATE TABLE IF NOT EXISTS perfiles (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        descripcion VARCHAR(255),
        palabras_clave TEXT[] NOT NULL
      )
    `)

        // Tabla licitaciones
        await pool.query(`
      CREATE TABLE IF NOT EXISTS licitaciones (
        id SERIAL PRIMARY KEY,
        codigo_externo VARCHAR(100) UNIQUE NOT NULL,
        nombre VARCHAR(255),
        descripcion TEXT,
        estado VARCHAR(100),
        monto_estimado FLOAT,
        region VARCHAR(100),
        fecha_cierre TIMESTAMP,
        dias_restantes INT,
        fecha_creacion TIMESTAMP DEFAULT NOW()
      )
    `)

        // Tabla relación licitaciones - perfiles
        await pool.query(`
      CREATE TABLE IF NOT EXISTS licitaciones_perfiles (
        licitacion_id INT REFERENCES licitaciones(id),
        perfil_id INT REFERENCES perfiles(id),
        PRIMARY KEY (licitacion_id, perfil_id)
      )
    `)

        console.log('Tablas creadas ✅')

        // Insertar perfiles iniciales
        await pool.query(`
      INSERT INTO perfiles (nombre, descripcion, palabras_clave)
      VALUES 
        ('jorge', 'Desarrollo web y tecnología', ARRAY['web','digital','software','aplicación','plataforma','desarrollo','programación','sitio','portal','app','página']),
        ('esposa', 'Teatro y artes escénicas', ARRAY['teatro','artes escénicas','escénico','espectáculo','cultural','producción','obra','danza','música','festival','difusión cultural','animación']),
        ('mineria_ia', 'Minería e Inteligencia Artificial', ARRAY['minería','extracción','yacimiento','mineral','faena','mina','inteligencia artificial','machine learning','IA','datos','analítica','automatización','algoritmo','big data'])
      ON CONFLICT DO NOTHING
    `)

        console.log('Perfiles insertados ✅')
        process.exit(0)

    } catch (error) {
        console.error('Error al inicializar:', error.message)
        process.exit(1)
    }
}

init()