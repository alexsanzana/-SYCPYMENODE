const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos, validarJWT, esAdminRole } = require('../middlewares');
const { existeCotizacionPorId } = require('../helpers/db-validators');
const { obtenerCotizaciones, obtenerCotizacion, crearCotizacion, actualizarCotizacion, desactivarActivarCotizacion } = require('../controllers');

const router = new Router();

router.get('/', obtenerCotizaciones);

router.get('/:id', [
    check('id', 'No es un Id de Mongo válido').isMongoId(),
    check('id').custom(existeCotizacionPorId),
    validarCampos,
], obtenerCotizacion);

router.post('/', [
    validarJWT,
    check('numeroCotizacion', 'El numero de cotización no puede ser nulo').not().isEmpty(),
    validarCampos
], crearCotizacion);

router.put('/:id', [
    validarJWT,
    check('numeroCotizacion', 'El numero de cotizacion').not().isEmpty(),
    check('id').custom(existeCotizacionPorId),
    validarCampos
], actualizarCotizacion);

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeCotizacionPorId),
    validarCampos
], desactivarActivarCotizacion);

module.exports = router;