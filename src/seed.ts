import db from './config/db'
import Guitar from './models/Guitar.model'

const guitars = [
    { name: 'Lukather',  image: 'guitarra_01', description: 'Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.', price: 299 },
    { name: 'SRV',       image: 'guitarra_02', description: 'Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.', price: 349 },
    { name: 'Borland',   image: 'guitarra_03', description: 'Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.', price: 329 },
    { name: 'VAI',       image: 'guitarra_04', description: 'Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.', price: 299 },
    { name: 'Thompson',  image: 'guitarra_05', description: 'Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.', price: 399 },
    { name: 'White',     image: 'guitarra_06', description: 'Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.', price: 329 },
    { name: 'Cobain',    image: 'guitarra_07', description: 'Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.', price: 349 },
    { name: 'Dale',      image: 'guitarra_08', description: 'Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.', price: 379 },
    { name: 'Krieger',   image: 'guitarra_09', description: 'Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.', price: 289 },
    { name: 'Campbell',  image: 'guitarra_10', description: 'Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.', price: 349 },
    { name: 'Reed',      image: 'guitarra_11', description: 'Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.', price: 399 },
    { name: 'Hazel',     image: 'guitarra_12', description: 'Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.', price: 379 },
]

async function seed() {
    try {
        await db.authenticate()
        await db.sync({ force: true })
        console.log('Tabla sincronizada (recreada).')

        await Guitar.bulkCreate(guitars)
        console.log('Guitarras insertadas correctamente.')
    } catch (error) {
        console.error('Error al insertar guitarras:', error)
    } finally {
        await db.close()
    }
}

seed()
