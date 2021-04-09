const Role = require('../models/role');
const { Usuario, Categoria, Producto, Observacione } = require('../models');
// valida si el rol es valido
const esRolValido = async(rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en la BD`);
    }
}

// verifica si existe el correo
const emailExiste = async(correo = '') => {
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El correo ${correo} ya está registrado`);
    }
}

// Verificar si existe un usuario por ID
const existeUsuarioPorId = async(id) => {
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El Id no existe ${id}`);
    }
}

// Verifica si existe categoria por Id
const existeCategoriaPorId = async(id) => {
    const existeCategoria = await Categoria.findById(id);
    if (!existeCategoria) {
        throw new Error(`El Id no existe ${id}`);
    }
}

// Verifica si existe producto por Id
const existeProductoPorId = async(id) => {
    const existeProducto = await Producto.findById(id);
    if (!existeProducto) {
        throw new Error(`El Id no existe ${id}`);
    }
}

// Verifica si existe observacion por Id
const existeObservacionPorId = async(id) => {
    const existeObservacion = await Observacione.findById(id);
    if (!existeObservacion) {
        throw new Error(`El Id no existe ${id}`);
    }
}

// Validar colecciones permitidas
const coleccionesPermitidas = async(coleccion = '', colecciones = []) => {
    const incluida = colecciones.includes(coleccion);
    if (!incluida) {
        throw new Error(`La colección ${coleccion} no es permitida, ${colecciones}`)
    }
    return true;
}

module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId,
    existeObservacionPorId,
    coleccionesPermitidas
}