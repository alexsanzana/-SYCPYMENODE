const { request, response } = require("express");
const { RegistrosTipo, Tipo } = require("../models");

const obtenerRegistrosTipos = async(req = request, res = response) => {
    const { limite = 500, desde = 0 } = req.query;
    const [total, respuesta] = await Promise.all([
        RegistrosTipo.countDocuments(),
        RegistrosTipo.find()
        .populate('usuario', 'nombre')
        .populate('tipo', 'nombre')
        .limit(Number(limite))
        .skip(Number(desde))
    ]);
    res.json({
        total,
        respuesta
    });
}

const obtenerRegistrosPorTipo = async(req = request, res = response) => {
    const { id } = req.params;
    try {
        const registrosPorTipo = await RegistrosTipo.find({ tipo: id });
        res.json(registrosPorTipo);



    } catch (error) {
        res.status(400).json({ error });
    }
}

const crearRegistroTipo = async(req = request, res = response) => {
    try {
        const registrosTipoDB = await RegistrosTipo.findOne({ nombre: req.body.nombre.toUpperCase(), tipo: req.body.tipo })
        if (registrosTipoDB) {
            return res.json({
                msg: `El tipo ${ registrosTipoDB.nombre } ya existe`
            });
        } else {
            const data = {
                nombre: req.body.nombre.toUpperCase(),
                tipo: req.body.tipo, // asanzana tipoId
                usuario: req.usuario._id
            }
            const registroTipo = await new RegistrosTipo(data);
            //Guardar DB seria bueno tener esto dentro de un trycatch
            await registroTipo.save();
            res.status(201).json(registroTipo);
        }
    } catch (error) {
        res.status(400).json({ error })
    }
}

const actualizarRegistroTipo = async(req = request, res = response) => {
    try {
        const { id } = req.params;
        const { activo, usuario, ...data } = req.body;
        const registrosTipoDB = await RegistrosTipo.findOne({ nombre: req.body.nombre.toUpperCase(), tipo: req.body.tipo })
        if (registrosTipoDB) {
            return res.json({
                msg: `El tipo ${ registrosTipoDB.nombre } ya existe`
            });
        } else {
            data.nombre = data.nombre.toUpperCase();
            data.tipo = data.tipo; // asanzana 
            data.usuario = req.usuario._id;
            const registroTipo = await RegistrosTipo.findByIdAndUpdate(id, data, { new: true });
            res.json(registroTipo);
        }
    } catch (error) {
        res.status(400).json({ error })
    }
}

// Desactivar o activa segun corresponda
const desactivarActivarRegistroTipo = async(req = request, res = response) => {
    const { id } = req.params;
    const registroTipoDB = await RegistrosTipo.findById(id);
    if (registroTipoDB.activo) {
        const registroTipoDesactivado = await RegistrosTipo.findByIdAndUpdate(id, { activo: false }, { new: true });
        res.json(registroTipoDesactivado);
    } else {
        const registroTipoActivado = await RegistrosTipo.findByIdAndUpdate(id, { activo: true }, { new: true });
        res.json(registroTipoActivado);
    }
}

module.exports = {
    obtenerRegistrosTipos,
    obtenerRegistrosPorTipo,
    crearRegistroTipo,
    actualizarRegistroTipo,
    desactivarActivarRegistroTipo
}