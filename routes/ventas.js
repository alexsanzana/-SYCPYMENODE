const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos, validarJWT, esAdminRole } = require('../middlewares');
const { existeVentaPorId } = require('../helpers/db-validators');
const { obtenerVentas, obtenerVenta, crearVenta, actualizarVenta, desactivarActivarVenta } = require('../controllers');

const router = new Router();

router.get('/', obtenerVentas);

router.get('/:id', [
    check('id', 'No es un Id de Mongo válido').isMongoId(),
    check('id').custom(existeVentaPorId),
    validarCampos,
], obtenerVenta);

router.post('/', [
    validarJWT,
    check('numeroVenta', 'El numero de venta no puede ser nulo').not().isEmpty(),
    validarCampos
], crearVenta);

router.put('/:id', [
    validarJWT,
    check('numeroVenta', 'El numero de venta').not().isEmpty(),
    check('id').custom(existeVentaPorId),
    validarCampos
], actualizarVenta);

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeVentaPorId),
    validarCampos
], desactivarActivarVenta);

module.exports = router;