const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos, validarJWT, esAdminRole } = require('../middlewares');
const { existeEmpleadoPorId } = require('../helpers/db-validators');
const { obtenerEmpleados, crearEmpleado, actualizarEmpleado, desactivarActivarEmpleado } = require('../controllers');

const router = new Router();

router.get('/', obtenerEmpleados);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellido', 'El apellido es obligatorio').not().isEmpty(),
    check('rut', 'El rut es obligatorio').not().isEmpty(),
    check('correo', 'El correo es obligatorio').not().isEmpty(),
    check('telefono', 'El teléfono es obligatorio').not().isEmpty(),
    check('calle', 'La dirección es obligatoria').not().isEmpty(),
    validarCampos
], crearEmpleado);

router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellido', 'El apellido es obligatorio').not().isEmpty(),
    check('rut', 'El rut es obligatorio').not().isEmpty(),
    check('correo', 'El correo es obligatorio').not().isEmpty(),
    check('telefono', 'El teléfono es obligatorio').not().isEmpty(),
    check('calle', 'La dirección es obligatoria').not().isEmpty(),
    check('id').custom(existeEmpleadoPorId),
    validarCampos
], actualizarEmpleado);

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeEmpleadoPorId),
    validarCampos
], desactivarActivarEmpleado);

module.exports = router;