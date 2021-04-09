const { request, response } = require("express");
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/generar-jwt");

const login = async(req = request, res = response) => {
    const { correo, password } = req.body;
    try {
        // verificar si el Email existe
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            });
        }
        // verificar si el usaurio esta activo emnla base de datos
        if (!usuario.activo) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - activo: false'
            });
        }
        // verificar la contraseña 
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            });
        }
        //Generar el JWT
        const token = await generarJWT(usuario.id);
        res.json({
            usuario,
            token
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Bable con el administrador'
        });
    }
}

const renewToken = async(req, res = response) => {

    const uid = req.usuario._id;
    //Generar el JWT
    const token = await generarJWT(uid);
    // Obtener el usuario por UID
    const usuario = await Usuario.findById(uid);


    res.json({
        token,
        usuario
    })
}

module.exports = {
    login,
    renewToken
}