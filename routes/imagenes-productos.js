const { Router, request, response } = require('express');
const { check } = require('express-validator');
const { existeProductoPorId, existeImagenProductoPorId } = require('../helpers/db-validators');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');
const {
    crearImagenProducto,
    obtenerImagenesProductos,
    obtenerImagenProducto,
    actualizarImagenProducto,
    desactivarActivarImagenProducto
} = require('../controllers');

const router = new Router();

router.get('/', obtenerImagenesProductos);

router.get('/:id', [
    check('id', 'No es un Id de Mongo válido').isMongoId(),
    check('id').custom(existeImagenProductoPorId),
    validarCampos,
], obtenerImagenProducto);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('producto', 'No es un Id de Mongo válido').isMongoId(),
    check('producto').custom(existeProductoPorId),
    validarCampos
], crearImagenProducto);

router.put('/:id', [
    validarJWT,
    //check('categoria', 'No es un Id de Mongo válido').isMongoId(),
    check('id').custom(existeImagenProductoPorId),
    validarCampos
], actualizarImagenProducto);

// Borrar una categoria solo si es administrador Activo: false
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un Id de Mongo válido').isMongoId(),
    check('id').custom(existeImagenProductoPorId),
    validarCampos
], desactivarActivarImagenProducto);

module.exports = router;