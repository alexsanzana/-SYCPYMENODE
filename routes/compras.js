const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos, validarJWT, esAdminRole } = require('../middlewares');
const { existeCompraPorId } = require('../helpers/db-validators');
const { obtenerCompras, obtenerCompra, crearCompra, actualizarCompra, desactivarActivarCompra } = require('../controllers');

const router = new Router();

router.get('/', obtenerCompras);

router.get('/:id', [
    check('id', 'No es un Id de Mongo válido').isMongoId(),
    check('id').custom(existeCompraPorId),
    validarCampos,
], obtenerCompra);

router.post('/', [
    validarJWT,
    check('numeroCompra', 'El numero de compra no puede ser nulo').not().isEmpty(),
    validarCampos
], crearCompra);

router.put('/:id', [
    validarJWT,
    check('numeroCompra', 'El numero de compra').not().isEmpty(),
    check('id').custom(existeCompraPorId),
    validarCampos
], actualizarCompra);

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeCompraPorId),
    validarCampos
], desactivarActivarCompra);

module.exports = router;