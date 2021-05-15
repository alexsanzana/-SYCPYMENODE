const { request, response } = require("express");
const { Pago } = require("../models");

const obtenerPagos = async(req = request, res = response) => {
    const { limite = 500, desde = 0 } = req.query;
    const [total, respuesta] = await Promise.all([
        Pago.countDocuments(),
        Pago.find()
        .populate('usuario', 'nombre')
        .limit(Number(limite))
        .skip(Number(desde))
    ]);
    res.json({
        total,
        respuesta
    });
}

const crearPago = async(req = request, res = response) => {
    try {
        const pagoDB = await Pago.findOne({ rut: req.body.rut })
        const data = {
            valor: req.body.valor,
            descripcion: req.body.descripcion,
            fecha: req.body.fecha,
            tipoPago: req.body.tipoPago,
            medioPago: req.body.medioPago,
            usuario: req.usuario._id
        }
        const pago = await new Pago(data);
        await pago.save();
        res.status(201).json(pago);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error })
    }
}

const actualizarPago = async(req = request, res = response) => {
    try {
        const { id } = req.params;
        const { activo, usuario, ...data } = req.body;
        data.valor = data.valor
        data.descripcion = data.descripcion;
        data.fecha = data.fecha;
        data.tipoPago = data.tipoPago;
        data.medioPago = data.medioPago;
        data.usuario = req.usuario._id;
        const pago = await Pago.findByIdAndUpdate(id, data, { new: true });
        res.json(pago);
    } catch (error) {
        res.status(400).json({ error })
    }
}

// Desactivar o activa segun corresponda
const desactivarActivarPago = async(req = request, res = response) => {
    const { id } = req.params;
    const pagoDB = await Pago.findById(id);
    if (pagoDB.activo) {
        const pagoDesactivado = await Pago.findByIdAndUpdate(id, { activo: false }, { new: true });
        res.json(pagoDesactivado);
    } else {
        const pagoActivado = await Pago.findByIdAndUpdate(id, { activo: true }, { new: true });
        res.json(pagoActivado);
    }
}

module.exports = {
    obtenerPagos,
    crearPago,
    actualizarPago,
    desactivarActivarPago
}