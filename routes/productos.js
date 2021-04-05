const { Router, request, response } = require('express');
const { check } = require('express-validator');
const { existeCategoriaPorId, existeProductoPorId } = require('../helpers/db-validators');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');
const {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    desactivarProducto
} = require('../controllers');

const router = new Router();

router.get('/', obtenerProductos);

router.get('/:id', [
    check('id', 'No es un Id de Mongo válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos,
], obtenerProducto);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un Id de Mongo válido').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos
], crearProducto);

router.put('/:id', [
    validarJWT,
    //check('categoria', 'No es un Id de Mongo válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], actualizarProducto);

// Borrar una categoria solo si es administrador Activo: false
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un Id de Mongo válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], desactivarProducto);

module.exports = router;