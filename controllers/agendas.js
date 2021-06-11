const { request, response } = require("express");
const { Agenda } = require("../models");

const obtenerAgendas = async(req = request, res = response) => {
    const { limite = 500, desde = 0 } = req.query;
    const [total, respuesta] = await Promise.all([
        Agenda.countDocuments(),
        Agenda.find()
        .limit(Number(limite))
        .skip(Number(desde))
    ]);
    res.json({
        total,
        respuesta
    });
}

const obtenerAgenda = async(req = request, res = response) => {
    const { id } = req.params;
    const agenda = await Agenda.findById(id)
    res.json(agenda);
}

const crearAgenda = async(req = request, res = response) => {

    const { activo, ...data } = req.body;
    data.usuario = req.usuario._id;
    const agenda = await new Agenda(data);
    await agenda.save();
    res.status(201).json(agenda);
}

const actualizarAgenda = async(req = request, res = response) => {
    try {
        const { id } = req.params;
        const { activo, usuario, ...data } = req.body;
        /* data.nombre = data.nombre.toUpperCase(); */
        data.usuario = req.usuario._id;
        const agenda = await Agenda.findByIdAndUpdate(id, data, { new: true });
        res.json(agenda);
    } catch (error) {
        res.status(400).json({ error })
    }
}

// Desactivar o activa segun corresponda
const desactivarActivarAgenda = async(req = request, res = response) => {
    const { id } = req.params;
    const agendaDB = await Agenda.findById(id);
    if (agendaDB.activo) {
        const agendaDesactivada = await Agenda.findByIdAndUpdate(id, { activo: false }, { new: true });
        res.json(agendaDesactivada);
    } else {
        const agendaActivada = await Agenda.findByIdAndUpdate(id, { activo: true }, { new: true });
        res.json(agendaActivada);
    }
}

module.exports = {
    obtenerAgendas,
    obtenerAgenda,
    crearAgenda,
    actualizarAgenda,
    desactivarActivarAgenda
}