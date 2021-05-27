const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos, validarJWT, esAdminRole } = require('../middlewares');
const { existeProveedorPorId } = require('../helpers/db-validators');
const { obtenerProveedores, obtenerProveedor, crearProveedor, actualizarProveedor, desactivarActivarProveedor } = require('../controllers');

const router = new Router();

router.get('/', obtenerProveedores);

router.get('/:id', [
    check('id', 'No es un Id de Mongo válido').isMongoId(),
    check('id').custom(existeProveedorPorId),
    validarCampos,
], obtenerProveedor);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('nombreEmpresa', 'El nombre de empresa es obligatorio').not().isEmpty(),
    check('rut', 'El rut es obligatorio').not().isEmpty(),
    check('correo', 'El correo es obligatorio').not().isEmpty(),
    check('telefono', 'El teléfono es obligatorio').not().isEmpty(),
    check('calle', 'La dirección es obligatoria').not().isEmpty(),
    validarCampos
], crearProveedor);

router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('nombreEmpresa', 'El nombre de empresa es obligatorio').not().isEmpty(),
    check('rut', 'El rut es obligatorio').not().isEmpty(),
    check('correo', 'El correo es obligatorio').not().isEmpty(),
    check('telefono', 'El teléfono es obligatorio').not().isEmpty(),
    check('calle', 'La dirección es obligatoria').not().isEmpty(),
    check('id').custom(existeProveedorPorId),
    validarCampos
], actualizarProveedor);

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeProveedorPorId),
    validarCampos
], desactivarActivarProveedor);

module.exports = router;