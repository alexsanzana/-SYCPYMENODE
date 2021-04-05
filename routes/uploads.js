const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos, validarArchivoSubir } = require('../middlewares');
const { cargarArchivo, actualizarImagen, mostrarImagen, actualizarImagenCloudinary } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers');

const router = new Router();

router.post('/', validarArchivoSubir, cargarArchivo);

router.put('/:coleccion/:id', [
    validarArchivoSubir,
    check('id', 'El Id debe ser de Mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos', 'empleados', 'ventas', 'compras', 'proveedores', 'archivos'])),
    validarCampos
], actualizarImagenCloudinary);
//], actualizarImagen);

router.get('/:coleccion/:id', [
    check('id', 'El Id debe ser de Mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos', 'empleados', 'ventas', 'compras', 'proveedores', 'archivos'])),
    validarCampos
], mostrarImagen);


module.exports = router;