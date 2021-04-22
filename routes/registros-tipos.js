const { Router } = require('express');
const { check } = require('express-validator');
const { existeRegistroTipoPorId } = require('../helpers/db-validators');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');
const { obtenerRegistrosTipos, crearRegistroTipo, actualizarRegistroTipo, desactivarActivarRegistroTipo } = require('../controllers/registros-tipos.js');

const router = new Router();

router.get('/', obtenerRegistrosTipos);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearRegistroTipo);

router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeRegistroTipoPorId),
    validarCampos
], actualizarRegistroTipo);

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un Id de Mongo válido').isMongoId(),
    check('id').custom(existeRegistroTipoPorId),
    validarCampos
], desactivarActivarRegistroTipo);

module.exports = router;