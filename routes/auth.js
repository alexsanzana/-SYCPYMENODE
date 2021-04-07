const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { login, renewToken } = require('../controllers');
const { validarJWT } = require('../middlewares');

const router = new Router();

router.post('/login', [
    check('correo', 'El cporreo es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
], login);

router.get('/renew', [
    validarJWT,
], renewToken);

module.exports = router;