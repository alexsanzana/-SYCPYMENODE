const { Router } = require('express');
const { check } = require('express-validator');
const { existeComunaPorId } = require('../helpers/db-validators');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');
const { obtenerComunas, crearComuna, actualizarComuna, desactivarActivarComuna } = require('../controllers/comunas.js');

const router = new Router();

router.get('/', obtenerComunas);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearComuna);

router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeComunaPorId),
    validarCampos
], actualizarComuna);

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un Id de Mongo válido').isMongoId(),
    check('id').custom(existeComunaPorId),
    validarCampos
], desactivarActivarComuna);

module.exports = router;