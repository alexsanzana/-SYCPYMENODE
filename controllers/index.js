const auth = require('./auth');
const buscar = require('./buscar');
const categoria = require('./categorias');
const producto = require('./productos');
const usuario = require('./usuarios');
const observaciones = require('./observaciones');
const tipos = require('./tipos');
const registrosTipos = require('./registros-tipos');
const regiones = require('./regiones');
const comunas = require('./comunas');
const proveedores = require('./proveedores');
const empleados = require('./empleados');
const clientes = require('./clientes');
const pagos = require('./pagos');
const imagenesProductos = require('./imagenes-productos');
const cotizaciones = require('./cotizaciones');
const ventas = require('./ventas');
const compras = require('./compras');

module.exports = {
    ...auth,
    ...buscar,
    ...categoria,
    ...producto,
    ...usuario,
    ...observaciones,
    ...tipos,
    ...registrosTipos,
    ...regiones,
    ...comunas,
    ...proveedores,
    ...empleados,
    ...clientes,
    ...pagos,
    ...imagenesProductos,
    ...cotizaciones,
    ...ventas,
    ...compras

}