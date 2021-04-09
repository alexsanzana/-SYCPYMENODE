const { Router } = require('express');
const { check } = require('express-validator');
const { existeObservacionPorId } = require('../helpers/db-validators');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');
const { obtenerObservaciones, crearObservacion, actualizarObservacion, desactivarObservacion } = require('../controllers/observaciones');

const router = new Router();

router.get('/', obtenerObservaciones);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearObservacion);

router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeObservacionPorId),
    validarCampos
], actualizarObservacion);

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un Id de Mongo válido').isMongoId(),
    check('id').custom(existeObservacionPorId),
    validarCampos
], desactivarObservacion);

module.exports = router;