
const Mongoose = require("mongoose")

const  UsuarioSchema = new Mongoose.Schema({
        usuario: {
          type: String,
          unique: true,
          required: true,
        },
        password: {
          type: String,
          minlength: 6,
          required: true,
        },
         nombre: {
             type: String,
             default: "Basic",
             required: true,
           },
           descripcion: {
             type: String,
             default: "Basic",
             required: true,
           },
           email: {
             type: String,
             default: "Basic",
             required: true,
           },
           activo: {
             type: Number,
             default: "Basic",
             required: true,
           },
           perfil: {
             type: String,
              default: "Basic",
           required: true,
         },
      })
      const model = Mongoose.model('usuario', UsuarioSchema);

      module.exports=model;