const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos, validarJWT, esAdminRole } = require('../middlewares');
const { existeAgendaPorId } = require('../helpers/db-validators');
const { obtenerAgendas, crearAgenda, actualizarAgenda, desactivarActivarAgenda } = require('../controllers');

const router = new Router();

router.get('/', obtenerAgendas);

router.post('/', [
    validarJWT,
], crearAgenda);

router.put('/:id', [
    validarJWT,
    check('id').custom(existeAgendaPorId),
    validarCampos
], actualizarAgenda);

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeAgendaPorId),
    validarCampos
], desactivarActivarAgenda);

module.exports = router;