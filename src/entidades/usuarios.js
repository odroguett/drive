const conexion = require("../baseDatos/conexionBD");
const Usuario = require("../baseDatos/modelo/usuarioModelo");
const bcrypt = require('bcrypt');
const objetoRespuesta = require("../OTD/respuesta");

class Usuarios {

  constructor() {
  }
  

  buscarListaUsuario = async (usuario) =>{
    try {

      let oRespuesta = objetoRespuesta;
      oRespuesta.esValido = true;
      oRespuesta.mensaje ="Usuario obtenido con exito";

      oRespuesta.objeto = await Usuario.find();
      return oRespuesta;

    } catch (error) {
      oRespuesta.esValido = false;
      oRespuesta.mensaje ="No existen usuarios registrados";
    }
  }

  buscarUsuario = async (usuario) =>{
    let oRespuesta = objetoRespuesta;
    try {
      
      if(usuario ===undefined)
      {

        oRespuesta.esValido = false;
        oRespuesta.mensaje ="No existe usuario";  
        return oRespuesta;
      }
      oRespuesta.objeto = await Usuario.findOne({
        usuario
      });

      if(oRespuesta.objeto != null || oRespuesta.objeto != undefined)
      {
        oRespuesta.esValido = true;
        oRespuesta.mensaje ="Usuario obtenido con exito";
        return oRespuesta
      }
      else
      {
        oRespuesta.esValido = false;
        oRespuesta.mensaje ="No existe Usuario";
        return oRespuesta

      }

    } catch (error) {
      oRespuesta.esValido = false;
      console.log(error);
      oRespuesta.mensaje ="No existen usuarios registrados";
      return oRespuesta;
    }
  }

  autentificarUsuario = async (usuario,password) =>
  {
    try {
     let oRespuesta = objetoRespuesta;
      
     console.log(oRespuesta);
      const respuestaUsuario = await Usuario.findOne({
        usuario
      })
      
      if( await bcrypt.compare(password,respuestaUsuario.password))
      {
        
        oRespuesta.esValido = true;
        oRespuesta.mensaje ="Usuario autentificado con exito";
        return oRespuesta;
      }
      else
      {
        
        this.oRespuesta.esValido =false;
        this.oRespuesta.mensaje ="Error al autentificar usuario";
        console.log(this.oRespuesta);
        return this.oRespuesta;

      }
  
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

      return false;
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
