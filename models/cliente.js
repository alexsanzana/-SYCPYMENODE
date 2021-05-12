const { Schema, model } = require('mongoose');

const ClienteSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    apellido: {
        type: String,
        required: [true, 'El apellido es obligatorio'],
    },
    rut: {
        type: String,
        required: [true, 'El rut es obligatorio'],
    },
    rutEmpresa: {
        type: String,
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
    tipoCanal: {
        type: Schema.Types.ObjectId,
        ref: 'RegistrosTipo',
        required: true
    },
    tipoCliente: {
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
ClienteSchema.methods.toJSON = function() {
    const { __v, ...data } = this.toObject();
    return data;
}

module.exports = model('Cliente', ClienteSchema);