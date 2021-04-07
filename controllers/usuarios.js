const { request, response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

const usuariosGet = async(req = request, res = response) => {
    const { limite = 100, desde = 0 } = req.query;
    const query = { activo: true };
    /*     const usuarios = await Usuario.find(query)
            .limit(Number(limite))
            .skip(Number(desde));
        const total = await Usuario.countDocuments(query); */
    // de esta forma puedo encadenar 2 consultas para ejecutarse al mismo tiempo
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query), // cuenta el totald e registros o documentos,
        Usuario.find(query)
        .limit(Number(limite))
        .skip(Number(desde))
    ])
    res.json({
        total,
        usuarios
    })
}

const usuariosPost = async(req = request, res = response) => {
    // al desestructurar evito que me envien cualquier dato que yo no deseo
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);
    //Guardar en BD
    await usuario.save();
    res.json(usuario);
}

const usuariosPut = async(req, res = response) => {
    // obtenemos valor enviados como parametros
    const { id } = req.params;
    const { _id, password, correo, ...resto } = req.body;
    // TODO: validar contra la bd
    if (password) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto);
    res.json(usuario);
}

const usuariosPatch = (req, res = response) => {

    res.json({
        msg: 'Patch api - controlador'
    })
}

const usuariosDelete = async(req, res = response) => {
    const { id } = req.params;
    const usuario = await Usuario.findByIdAndUpdate(id, { activo: false });
    res.json(usuario);
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}