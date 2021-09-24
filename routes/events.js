/*
    Event Routes
    /api/events
*/


const { Router } = require('express');
const { check } = require('express-validator');
const { getEvents, createEvent, putEvent, deleteEvent } = require('../controllers/events');
const isDate = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

// Middleware, validar JWT
router.use( validarJWT );

// Obtener eventos
router.get('/', getEvents );

// Crear un nuevo evento
router.post(
        '/',
        [
            check('title', 'El titulo es obligatorio').not().isEmpty(),
            check('start', 'Fecha de inicio es obligatoria').custom( isDate ),
            check('end', 'Fecha de finalización es obligatoria').custom( isDate ),            
            validarCampos
        ],
        createEvent
);

// Actualizar eventos
router.put('/:id', putEvent );


// Borrar evento
router.delete('/:id', deleteEvent );


module.exports = router;