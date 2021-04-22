const { Router } = require('express');
const { check } = require('express-validator');
const { existeCodigoPorId } = require('../helpers/db-validators');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');
const { obtenerCodigos, crearCodigo, actualizarCodigo, desactivarActivarCodigo } = require('../controllers/codigos');

const router = new Router();

router.get('/', obtenerCodigos);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripción es obligatoria').not().isEmpty(),
    validarCampos
], crearCodigo);

router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCodigoPorId),
    validarCampos
], actualizarCodigo);

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un Id de Mongo válido').isMongoId(),
    check('id').custom(existeCodigoPorId),
    validarCampos
], desactivarActivarCodigo);

module.exports = router;