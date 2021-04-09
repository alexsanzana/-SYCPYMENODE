const { Schema, model } = require('mongoose');

const ObservacionSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    descripcion: {
        type: String,
    },
    activo: {
        type: Boolean,
        default: true,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});

// Eliminamos la version y el activo
ObservacionSchema.methods.toJSON = function() {
    const { __v, activo, ...data } = this.toObject();
    return data;
}

module.exports = model('Observacione', ObservacionSchema);