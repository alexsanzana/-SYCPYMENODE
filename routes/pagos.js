const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos, validarJWT, esAdminRole } = require('../middlewares');
const { existePagoPorId } = require('../helpers/db-validators');
const { obtenerPagos, crearPago, actualizarPago, desactivarActivarPago } = require('../controllers');

const router = new Router();

router.get('/', obtenerPagos);

router.post('/', [
    validarJWT,
    check('valor', 'El valor es obligatorio').not().isEmpty(),
    validarCampos
], crearPago);

router.put('/:id', [
    validarJWT,
    check('valor', 'El valor es obligatorio').not().isEmpty(),
    check('id').custom(existePagoPorId),
    validarCampos
], actualizarPago);

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existePagoPorId),
    validarCampos
], desactivarActivarPago);

module.exports = router;