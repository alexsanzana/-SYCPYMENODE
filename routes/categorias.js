const { Router, request, response } = require('express');
const { check } = require('express-validator');
const { existeCategoriaPorId } = require('../helpers/db-validators');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, desactivarCategoria } = require('../controllers/categorias');

const router = new Router();

// obtener todas las categorias - publico
router.get('/', obtenerCategorias);

// obtener una categoria por Id - publico
router.get('/:id', [
    check('id', 'No es un Id de Mongo válido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos,
], obtenerCategoria);

// crear categoria - privado - cualquier persona con token válido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria);

// Actualizar - privado - cualquiera con token válido
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], actualizarCategoria);

// Borrar una categoria solo si es administrador Activo: false
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un Id de Mongo válido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], desactivarCategoria);

module.exports = router;