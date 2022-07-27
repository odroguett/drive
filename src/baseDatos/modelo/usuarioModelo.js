const mongoose = require("mongoose")

const schema = mongoose.Schema;

const usuarioSchema = new schema({
    usuario: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        minlength: 6,
        required: true
    },
    nombre: {
        type: String,
        default: "",
        required: false
    },
    descripcion: {
        type: String,
        default: "",
        required: false
    },
    email: {
        type: String,
        default: "",
        required: false
    },
    activo: {
        type: String,
        default: "",
        required: false
    },
    perfil: {
        type: String,
        default: "",
        required: false
    },

    institucion_id: {
      type: String,
      default: "",
      required: false
  }
})


const model = mongoose.model('usuario', usuarioSchema);


module.exports = model;
