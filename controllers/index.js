const auth = require('./auth');
const buscar = require('./buscar');
const categoria = require('./categorias');
const producto = require('./productos');
const usuario = require('./usuarios');
const observacione = require('./observaciones');
const tipo = require('./tipos');
const registrosTipo = require('./registros-tipos');
const regione = require('./regiones');
const comuna = require('./comunas');
const proveedore = require('./proveedores');
const empleado = require('./empleados');
const cliente = require('./clientes');
const pago = require('./pagos');
const imagenesProducto = require('./imagenes-productos');
const cotizacione = require('./cotizaciones');
const venta = require('./ventas');
const compra = require('./compras');

module.exports = {
    ...auth,
    ...buscar,
    ...categoria,
    ...producto,
    ...usuario,
    ...observacione,
    ...tipo,
    ...registrosTipo,
    ...regione,
    ...comuna,
    ...proveedore,
    ...empleado,
    ...cliente,
    ...pago,
    ...imagenesProducto,
    ...cotizacione,
    ...venta,
    ...compra

}