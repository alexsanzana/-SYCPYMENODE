const { Schema, model } = require('mongoose');

const ProveedorSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    nombreEmpresa: {
        type: String,
        required: [true, 'El nombre empresa es obligatorio'],
    },
    rut: {
        type: String,
        required: [true, 'El rut es obligatorio'],
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
    },
    telefono: {
        type: String,
        required: [true, 'El telefono es obligatorio'],
    },
    fecha: {
        type: String,
        required: [true, 'El fecha es obligatoria'],
    },
    tipoPlataforma: {
        type: Schema.Types.ObjectId,
        ref: 'RegistrosTipo',
        required: true
    },
    tipoProveedor: {
        type: Schema.Types.ObjectId,
        ref: 'RegistrosTipo',
        required: true
    },
    calle: {
        type: String,
        required: [true, 'La dirección es obligatoria'],
    },
    region: {
        type: Schema.Types.ObjectId,
        ref: 'Regione',
        required: true
    },
    comuna: {
        type: Schema.Types.ObjectId,
        ref: 'Comuna',
        required: true
    },
    linkEmpresa: {
        type: String,
    },
    img: {
        type: String,
    },
    activo: {
        type: Boolean,
        default: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});

// Eliminamos la version 
ProveedorSchema.methods.toJSON = function() {
    const { __v, ...data } = this.toObject();
    return data;
}

module.exports = model('Proveedore', ProveedorSchema);