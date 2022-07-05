const conexion = require("../baseDatos/conexionBD");
const Usuario = require("../baseDatos/modelo/usuarioModelo");
const bcrypt = require('bcrypt');

class Usuarios {
  constructor() {}

  buscarListaUsuario = async (usuario) =>{
    try {
      const respuesta = await Usuario.find();
      return respuesta;
    } catch (error) {
      console.log(error);
    }
  }

  autentificarUsuario = async (usuario,password) =>
  {
    try {
      
      const respuesta = await Usuario.findOne({
        usuario
      })
      console.log(password);
      console.log(respuesta.password);
      if( await bcrypt.compare(password,respuesta.password))
      {

        return true;
      }
      else
      {
        return false;

      }

      return respuesta;
  
} catch (error) {
  
}

  }

  agregarUsuario = async (data) => {
    let password = data.password;
    let usuario = data.usuario;
    
    if (password.length < 6) {
      return res.status(400).json({ message: "Password menor a 6 caracteres" });
    }

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    console.log(salt);
    console.log(hash);

    console.log(data);

   
    try {
      const respuesta = await Usuario.create({
        usuario,
        password: hash
        
      });
      
      return respuesta;
    } catch (error) {
      console.log(error);
    }
  };
  eliminarUsuario = async (id) =>   {
    try {
      const respuesta = await Usuario.deleteOne({
        _id:id
      })
      return respuesta;
    } catch (error) {
      console.log(error);
    }

  }

  actualizarUsuario = async (id, data) =>   {
    try {
      const encontrarUsuario = await Usuario.findOne({
        _id: id
    });
    console.log(encontrarUsuario);
    if(encontrarUsuario === null)
    {

      return "Usuario no existe"
    }
    encontrarUsuario.nombre = data.nombre;
    console.log(data.nombre);

    const respuesta  = await Usuario.findOneAndUpdate({
      _id: id,
      nombre : encontrarUsuario.nombre 

    }); 
    return respuesta;

    } catch (error) {
      console.log(error);
    }

  }
}
module.exports = Usuarios;
