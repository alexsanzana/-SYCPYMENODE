const { request, response } = require("express");
const { ObjectId } = require('mongoose').Types;
const { Usuario, Categoria, Producto } = require('../models');
const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'productosPorCategoria',
    'roles'
];

const buscarUsuarios = async(termino = '', res = response) => {
    const esMongoID = ObjectId.isValid(termino);
    if (esMongoID) {
        const usuario = await Usuario.findById(termino); // utilizar el populate para los demas casos 
        return res.json({
            results: (usuario) ? [usuario] : []
        });
    }
    const regex = new RegExp(termino, 'i');
    const usuarios = await Usuario.find({
        $or: [{ nombre: regex }, { correo: regex }],
        $and: [{ activo: true }]
    });
    res.json({
        results: usuarios
    });
}

const buscarCategorias = async(termino = '', res = response) => {
    const esMongoID = ObjectId.isValid(termino);
    if (esMongoID) {
        const categoria = await Categoria.findById(termino); // utilizar el populate para los demas casos 
        return res.json({
            results: (categoria) ? [categoria] : []
        });
    }
    const regex = new RegExp(termino, 'i');
    const categorias = await Categoria.find({ nombre: regex, activo: true });
    res.json({
        results: categorias
    });
}

const buscarProductos = async(termino = '', res = response) => {
    const esMongoID = ObjectId.isValid(termino);
    if (esMongoID) {
        const producto = await Producto.findById(termino).populate('categoria', 'nombre'); // utilizar el populate para los demas casos 
        return res.json({
            results: (producto) ? [producto] : []
        });
    }
    const regex = new RegExp(termino, 'i');
    const productos = await Producto.find({
        $or: [{ nombre: regex }],
        $and: [{ activo: true }]
    }).populate('categoria', 'nombre');
    res.json({
        results: productos
    });
}

const buscarProductosPorCategoria = async(termino = '', res = response) => {
    const esMongoId = ObjectId.isValid(termino);
    let categoria = '';
    if (esMongoId) {
        categoria = await Categoria.findById(termino)
    }
    const productos = await Producto.find({ categoria: ObjectId(categoria._id), activo: true })
        .populate('categoria', 'nombre')
        .populate('usuario', 'nombre');

    res.json({
        results: productos
    });
}

const buscar = (req = request, res = response) => {

    const { coleccion, termino } = req.params;
    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            mdg: `Las colecciones permitidas son: ${coleccionesPermitidas}`
        });
    }
    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino, res);
            break;
        case 'categorias':
            buscarCategorias(termino, res);
            break;
        case 'productos':
            buscarProductos(termino, res);
            break;
        case 'productosPorCategoria':
            buscarProductosPorCategoria(termino, res);
            break;
        default:
            res.status(500).json({
                msg: 'Se me olvido hacer la busqueda'
            });
    }
}

module.exports = {
    buscar
}