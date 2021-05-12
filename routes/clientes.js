const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos, validarJWT, esAdminRole } = require('../middlewares');
const { existeClientePorId } = require('../helpers/db-validators');
const { obtenerClientes, crearCliente, actualizarCliente, desactivarActivarCliente } = require('../controllers');

const router = new Router();

router.get('/', obtenerClientes);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellido', 'El apellido es obligatorio').not().isEmpty(),
    check('rut', 'El rut es obligatorio').not().isEmpty(),
    check('correo', 'El correo es obligatorio').not().isEmpty(),
    check('telefono', 'El teléfono es obligatorio').not().isEmpty(),
    check('calle', 'La dirección es obligatoria').not().isEmpty(),
    validarCampos
], crearCliente);

router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellido', 'El apellido es obligatorio').not().isEmpty(),
    check('rut', 'El rut es obligatorio').not().isEmpty(),
    check('correo', 'El correo es obligatorio').not().isEmpty(),
    check('telefono', 'El teléfono es obligatorio').not().isEmpty(),
    check('calle', 'La dirección es obligatoria').not().isEmpty(),
    check('id').custom(existeClientePorId),
    validarCampos
], actualizarCliente);

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeClientePorId),
    validarCampos
], desactivarActivarCliente);

module.exports = router;