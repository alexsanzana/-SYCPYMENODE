const Role = require('../models/role');
const { Usuario, Categoria, Producto, Observacione, Codigo, Tipo, RegistrosTipo, Regione, Comuna, Proveedore, Empleado, Cliente, Pago, ImagenesProducto, Cotizacione, Venta, Compra } = require('../models');

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

// Verifica si existe Codigo por Id
const existeCodigoPorId = async(id) => {
    const existeCodigo = await Codigo.findById(id);
    if (!existeCodigo) {
        throw new Error(`El Id no existe ${id}`);
    }
}

// Verifica si existe Tipo por Id
const existeTipoPorId = async(id) => {
    const existeTipo = await Tipo.findById(id);
    if (!existeTipo) {
        throw new Error(`El Id no existe ${id}`);
    }
}

// Verifica si existe Registro Tipo por Id
const existeRegistroTipoPorId = async(id) => {
    const existeRegistroTipo = await RegistrosTipo.findById(id);
    if (!existeRegistroTipo) {
        throw new Error(`El Id no existe ${id}`);
    }
}

// Verifica si existe Region por Id
const existeRegionPorId = async(id) => {
    const existeRegion = await Regione.findById(id);
    if (!existeRegion) {
        throw new Error(`El Id no existe ${id}`);
    }
}

// Verifica si existe Comuna Region por Id
const existeComunaPorId = async(id) => {
    const existeComuna = await Comuna.findById(id);
    if (!existeComuna) {
        throw new Error(`El Id no existe ${id}`);
    }
}

// Verifica si existe Proveedor por Id
const existeProveedorPorId = async(id) => {
    const existeProveedor = await Proveedore.findById(id);
    if (!existeProveedor) {
        throw new Error(`El Id no existe ${id}`);
    }
}

// Verifica si existe Empleado por Id
const existeEmpleadoPorId = async(id) => {
    const existeEmpleado = await Empleado.findById(id);
    if (!existeEmpleado) {
        throw new Error(`El Id no existe ${id}`);
    }
}

// Verifica si existe Cliente por Id
const existeClientePorId = async(id) => {
    const existeCliente = await Cliente.findById(id);
    if (!existeCliente) {
        throw new Error(`El Id no existe ${id}`);
    }
}

// Verifica si existe Pago por Id
const existePagoPorId = async(id) => {
    const existePago = await Pago.findById(id);
    if (!existePago) {
        throw new Error(`El Id no existe ${id}`);
    }
}

// Verifica si existe Imagen producto por Id
const existeImagenProductoPorId = async(id) => {
    const existeImagenProducto = await ImagenesProducto.findById(id);
    if (!existeImagenProducto) {
        throw new Error(`El Id no existe ${id}`);
    }
}

// Verifica si existe Cotizacion por Id
const existeCotizacionPorId = async(id) => {
    const existeCotizacion = await Cotizacione.findById(id);
    if (!existeCotizacion) {
        throw new Error(`El Id no existe ${id}`);
    }
}

// Verifica si existe Venta por Id
const existeVentaPorId = async(id) => {
    const existeVenta = await Venta.findById(id);
    if (!existeVenta) {
        throw new Error(`El Id no existe ${id}`);
    }
}

// Verifica si existe Compra por Id
const existeCompraPorId = async(id) => {
    const existeCompra = await Compra.findById(id);
    if (!existeCompra) {
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
    coleccionesPermitidas,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId,
    existeObservacionPorId,
    existeCodigoPorId,
    existeTipoPorId,
    existeRegistroTipoPorId,
    existeRegionPorId,
    existeComunaPorId,
    existeProveedorPorId,
    existeEmpleadoPorId,
    existeClientePorId,
    existePagoPorId,
    existeImagenProductoPorId,
    existeCotizacionPorId,
    existeVentaPorId,
    existeCompraPorId
}