const { request, response } = require("express");
const { Producto } = require("../models");

const obtenerProductos = async(req = request, res = response) => {
    const { limite = 500, desde = 0 } = req.query;
    /*     const query = { activo: true }; */
    const [total, respuesta] = await Promise.all([
        Producto.countDocuments(), //query
        Producto.find() // query
        .populate('usuario', 'nombre')
        /*         .populate('categoria', 'nombre') */
        .limit(Number(limite))
        .skip(Number(desde))
    ]);
    res.json({
        total,
        respuesta
    });
}

const obtenerProducto = async(req = request, res = response) => {
    const { id } = req.params;
    const producto = await Producto.findById(id)
        .populate('usuario', 'nombre')
        /*         .populate('categoria', 'nombre'); */
    res.json(producto);
}

const crearProducto = async(req = request, res = response) => {
    const { activo, usuario, ...body } = req.body;
    const productoDB = await Producto.findOne({ nombre: body.nombre.toUpperCase() });
    if (productoDB) {
        return res.status(400).json({
            msg: `La producto ${productoDB.nombre}, ya existe `
        });
    }
    // generar la data a guardar
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id
    }
    const producto = new Producto(data);
    // Guardar en DB
    await producto.save();
    res.status(201).json(producto);
}

const actualizarProducto = async(req = request, res = response) => {
    const { id } = req.params;
    // eliminamos activo y usuario por si son enviados desde el frontEnd
    const { activo, usuario, ...data } = req.body;
    if (data.nombre) {
        data.nombre = data.nombre.toUpperCase();
    }
    data.usuario = req.usuario._id;
    const producto = await Producto.findByIdAndUpdate(id, data, { new: true });
    res.json(producto);
}

const desactivarActivarProducto = async(req = request, res = response) => {

    const { id } = req.params;
    const productoDB = await Producto.findById(id);
    if (productoDB.activo) {
        const productoDesactivado = await Producto.findByIdAndUpdate(id, { activo: false }, { new: true });
        res.json(productoDesactivado);
    } else {
        const productoActivado = await Producto.findByIdAndUpdate(id, { activo: true }, { new: true });
        res.json(productoActivado);
    }
}

module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    desactivarActivarProducto
}