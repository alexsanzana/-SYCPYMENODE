const auth = require('./auth');
const buscar = require('./buscar');
const categoria = require('./categorias');
const producto = require('./productos');
const usuario = require('./usuarios');

module.exports = {
    ...auth,
    ...buscar,
    ...categoria,
    ...producto,
    ...usuario,
}