const { Router } = require('express');
const { check } = require('express-validator');
const { existeRegionPorId } = require('../helpers/db-validators');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');
const { obtenerRegiones, crearRegion, actualizarRegion, desactivarActivarRegion } = require('../controllers/regiones');

const router = new Router();

router.get('/', obtenerRegiones);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearRegion);

router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeRegionPorId),
    validarCampos
], actualizarRegion);

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un Id de Mongo válido').isMongoId(),
    check('id').custom(existeRegionPorId),
    validarCampos
], desactivarActivarRegion);

module.exports = router;