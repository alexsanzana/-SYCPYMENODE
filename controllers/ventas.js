const { request, response } = require("express");
const { Venta } = require("../models");

const obtenerVentas = async(req = request, res = response) => {
    const { limite = 500, desde = 0 } = req.query;
    const [total, respuesta] = await Promise.all([
        Venta.countDocuments(),
        Venta.find()
        .limit(Number(limite))
        .skip(Number(desde))
    ]);
    res.json({
        total,
        respuesta
    });
}

const obtenerVenta = async(req = request, res = response) => {
    const { id } = req.params;
    const venta = await Venta.findById(id)
    res.json(venta);
}

const crearVenta = async(req = request, res = response) => {

    const { activo, ...data } = req.body;
    data.usuario = req.usuario._id;
    const venta = await new Venta(data);
    await venta.save();
    res.status(201).json(venta);
}

const actualizarVenta = async(req = request, res = response) => {
    try {
        const { id } = req.params;
        const { activo, usuario, ...data } = req.body;
        /*         data.nombre = data.nombre.toUpperCase(); */
        data.usuario = req.usuario._id;
        const venta = await Venta.findByIdAndUpdate(id, data, { new: true });
        res.json(venta);
    } catch (error) {
        res.status(400).json({ error })
    }
}

// Desactivar o activa segun corresponda
const desactivarActivarVenta = async(req = request, res = response) => {
    const { id } = req.params;
    const ventaDB = await Venta.findById(id);
    if (ventaDB.activo) {
        const ventaDesactivada = await Venta.findByIdAndUpdate(id, { activo: false }, { new: true });
        res.json(ventaDesactivada);
    } else {
        const ventaActivada = await Venta.findByIdAndUpdate(id, { activo: true }, { new: true });
        res.json(ventaActivada);
    }
}

module.exports = {
    obtenerVentas,
    obtenerVenta,
    crearVenta,
    actualizarVenta,
    desactivarActivarVenta
}