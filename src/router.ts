import { Router } from 'express'
import { createGuitar, deleteGuitar, getGuitars, getGuitarById, updateAvailability, updateGuitar } from './handlers/guitar'
import { body, param } from 'express-validator'
import { handlerInputErrors } from './middleware'

const router = Router()

// GET todas las guitarras
router.get('/', getGuitars)

// GET guitarra por ID
router.get('/:id',
    param('id').isInt().withMessage('ID no válido'),
    handlerInputErrors,
    getGuitarById
)

// POST crear guitarra
router.post('/',
    body('name')
        .notEmpty().withMessage('El nombre de la guitarra no puede ir vacío'),
    body('price')
        .isNumeric().withMessage('Valor no válido')
        .notEmpty().withMessage('El precio de la guitarra no puede ir vacío')
        .custom(value => value > 0).withMessage('El precio no puede ser menor a 0'),
    handlerInputErrors,
    createGuitar
)

// PUT actualizar guitarra completa
router.put('/:id',
    param('id').isInt().withMessage('ID no válido'),
    body('name')
        .notEmpty().withMessage('El nombre de la guitarra no puede ir vacío'),
    body('price')
        .isNumeric().withMessage('Valor no válido')
        .notEmpty().withMessage('El precio de la guitarra no puede ir vacío')
        .custom(value => value > 0).withMessage('El precio no puede ser menor a 0'),
    body('availability').isBoolean().withMessage('Valor para disponibilidad no válido'),
    handlerInputErrors,
    updateGuitar
)

// PATCH actualizar disponibilidad
router.patch('/:id',
    param('id').isInt().withMessage('ID no válido'),
    handlerInputErrors,
    updateAvailability
)

// DELETE eliminar guitarra
router.delete('/:id',
    param('id').isInt().withMessage('ID no válido'),
    handlerInputErrors,
    deleteGuitar
)

export default router