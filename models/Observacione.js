const { Schema, model } = require('mongoose');

const ObservacionSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre de la obserbacion es obligatorio'],
        unique: true
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción es obligatoria'],
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
ObservacionSchema.methods.toJSON = function() {
    const { __v, ...data } = this.toObject();
    return data;
}

module.exports = model('Observacione', ObservacionSchema);