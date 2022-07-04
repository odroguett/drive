const conexion =require('../baseDatos/conexionBD');
const Usuario = require('../baseDatos/modelo/usuarioModelo');

class Usuarios{

    constructor(){
    

    }
   agregarUsuario = async  (data)  =>    {
    let password = data.password;   
    let usuario = data.usuario;
    conexion();
    console.log(data);
        if (password.length < 6) {
            return res.status(400).json({ message: "Password menor a 6 caracteres" })
          }
          try {
           const respuesta =   await  Usuario.create({
                usuario,
                password,
              })

              console.log(respuesta);
              return respuesta;
          } catch (error) {
            console.log(error);
          }
        }
       
}
module.exports = Usuarios;