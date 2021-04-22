const auth = require('./auth');
const buscar = require('./buscar');
const categoria = require('./categorias');
const producto = require('./productos');
const usuario = require('./usuarios');
const observaciones = require('./observaciones');
const tipos = require('./tipos');

module.exports = {
    ...auth,
    ...buscar,
    ...categoria,
    ...producto,
    ...usuario,
    ...observaciones,
    ...tipos
}