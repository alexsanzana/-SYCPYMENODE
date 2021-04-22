const { Router } = require('express');
const { check } = require('express-validator');
const { existeTipoPorId } = require('../helpers/db-validators');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');
const { obtenerTipos, crearTipo, actualizarTipo, desactivarActivarTipo } = require('../controllers/tipos.js');

const router = new Router();

router.get('/', obtenerTipos);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripción es obligatoria').not().isEmpty(),
    validarCampos
], crearTipo);

router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeTipoPorId),
    validarCampos
], actualizarTipo);

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un Id de Mongo válido').isMongoId(),
    check('id').custom(existeTipoPorId),
    validarCampos
], desactivarActivarTipo);

module.exports = router;