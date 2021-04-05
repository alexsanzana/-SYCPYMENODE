const { request, response } = require("express");
const { Categoria } = require("../models");

const obtenerCategorias = async(req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { activo: true };
    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
        .populate('usuario', 'nombre')
        .limit(Number(limite))
        .skip(Number(desde))
    ]);
    res.json({
        total,
        categorias
    });
}

const obtenerCategoria = async(req = request, res = response) => {
    const { id } = req.params;
    const categoria = await Categoria.findById(id).populate('usuario', 'nombre');
    res.json(categoria);
}

const crearCategoria = async(req = request, res = response) => {
    const nombre = req.body.nombre.toUpperCase();
    const categoriaDB = await Categoria.findOne({ nombre });
    if (categoriaDB) {
        return res.status(400).json({
            msg: `La categoria ${ categoriaDB.nombre } ya existe`
        });
    }
    // generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }
    const categoria = await new Categoria(data);
    //Guardar DB seria bueno tener esto dentro de un trycatch
    await categoria.save();
    res.status(201).json(categoria);
}

const actualizarCategoria = async(req = request, res = response) => {
    const { id } = req.params;
    // eliminamos activo y usuario por si son enviados desde el frontEnd
    const { activo, usuario, ...data } = req.body;
    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;
    const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true });
    res.json(categoria);
}

// Desactivar categoria activo:false
const desactivarCategoria = async(req = request, res = response) => {
    const { id } = req.params;
    const categoriaDesactivada = await Categoria.findByIdAndUpdate(id, { activo: false }, { new: true });
    res.json(categoriaDesactivada);
}

module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    desactivarCategoria
}