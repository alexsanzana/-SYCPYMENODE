const { request, response } = require("express");
const { ImagenesProducto } = require("../models");

const obtenerImagenesProductos = async(req = request, res = response) => {
    const { limite = 500, desde = 0 } = req.query;
    /*     const query = { activo: true }; */
    const [total, respuesta] = await Promise.all([
        ImagenesProducto.countDocuments(), //query
        ImagenesProducto.find() // query
        .populate('usuario', 'nombre')
        .populate('producto', 'nombre')
        .limit(Number(limite))
        .skip(Number(desde))
    ]);
    res.json({
        total,
        respuesta
    });
}

const obtenerImagenProducto = async(req = request, res = response) => {
    const { id } = req.params;
    const imagenProducto = await ImagenesProducto.findById(id)
        .populate('usuario', 'nombre')
        /*         .populate('categoria', 'nombre'); */
    res.json(imagenProducto);
}

const crearImagenProducto = async(req = request, res = response) => {
    const { activo, usuario, ...body } = req.body;
    const imagenProductoDB = await ImagenesProducto.findOne({ nombre: body.nombre.toUpperCase() });
    if (imagenProductoDB) {
        return res.status(400).json({
            msg: `La imagen producto ${imagenProductoDB.nombre}, ya existe `
        });
    }
    // generar la data a guardar
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id
    }
    const imagenProducto = new ImagenesProducto(data);
    // Guardar en DB
    await imagenProducto.save();
    res.status(201).json(imagenProducto);
}

const actualizarImagenProducto = async(req = request, res = response) => {
    const { id } = req.params;
    // eliminamos activo y usuario por si son enviados desde el frontEnd
    const { activo, usuario, ...data } = req.body;
    if (data.nombre) {
        data.nombre = data.nombre.toUpperCase();
    }
    data.usuario = req.usuario._id;
    const imagenProducto = await ImagenesProducto.findByIdAndUpdate(id, data, { new: true });
    res.json(imagenProducto);
}

const desactivarActivarImagenProducto = async(req = request, res = response) => {

    const { id } = req.params;
    const imagenProductoDB = await ImagenesProducto.findById(id);
    if (imagenProductoDB.activo) {
        const iamgenProductoDesactivado = await ImagenesProducto.findByIdAndUpdate(id, { activo: false }, { new: true });
        res.json(iamgenProductoDesactivado);
    } else {
        const imagenProductoActivado = await ImagenesProducto.findByIdAndUpdate(id, { activo: true }, { new: true });
        res.json(imagenProductoActivado);
    }
}

module.exports = {
    crearImagenProducto,
    obtenerImagenesProductos,
    obtenerImagenProducto,
    actualizarImagenProducto,
    desactivarActivarImagenProducto
}