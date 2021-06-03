const { request, response } = require("express");
const { Compra } = require("../models");

const obtenerCompras = async(req = request, res = response) => {
    const { limite = 500, desde = 0 } = req.query;
    const [total, respuesta] = await Promise.all([
        Compra.countDocuments(),
        Compra.find()
        .limit(Number(limite))
        .skip(Number(desde))
    ]);
    res.json({
        total,
        respuesta
    });
}

const obtenerCompra = async(req = request, res = response) => {
    const { id } = req.params;
    const compra = await Compra.findById(id)
    res.json(compra);
}

const crearCompra = async(req = request, res = response) => {

    const { activo, ...data } = req.body;
    data.usuario = req.usuario._id;
    const compra = await new Compra(data);
    await compra.save();
    res.status(201).json(compra);
}

const actualizarCompra = async(req = request, res = response) => {
    try {
        const { id } = req.params;
        const { activo, usuario, ...data } = req.body;
        /*         data.nombre = data.nombre.toUpperCase(); */
        data.usuario = req.usuario._id;
        const compra = await Compra.findByIdAndUpdate(id, data, { new: true });
        res.json(compra);
    } catch (error) {
        res.status(400).json({ error })
    }
}

// Desactivar o activa segun corresponda
const desactivarActivarCompra = async(req = request, res = response) => {
    const { id } = req.params;
    const compraDB = await Compra.findById(id);
    if (compraDB.activo) {
        const compraDesactivada = await Compra.findByIdAndUpdate(id, { activo: false }, { new: true });
        res.json(compraDesactivada);
    } else {
        const compraActivada = await Compra.findByIdAndUpdate(id, { activo: true }, { new: true });
        res.json(compraActivada);
    }
}

module.exports = {
    obtenerCompras,
    obtenerCompra,
    crearCompra,
    actualizarCompra,
    desactivarActivarCompra
}