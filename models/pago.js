const { Schema, model } = require('mongoose');

const PagoSchema = Schema({
    valor: {
        type: Number,
        required: [true, 'El valor es obligatorio'],
    },
    descripcion: {
        type: String,
    },
    fecha: {
        type: String,
        required: [true, 'La fecha es obligatoria'],
    },
    tipoPago: {
        type: Schema.Types.ObjectId,
        ref: 'RegistrosTipo',
        required: true
    },
    medioPago: {
        type: Schema.Types.ObjectId,
        ref: 'RegistrosTipo',
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
PagoSchema.methods.toJSON = function() {
    const { __v, ...data } = this.toObject();
    return data;
}

module.exports = model('Pago', PagoSchema);