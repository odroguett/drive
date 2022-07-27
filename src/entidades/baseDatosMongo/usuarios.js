const RepositorioMongoDB = require("./RepositorioMongoDB");
const modelo = require("../../baseDatos/modelo/usuarioModelo");

class Usuarios extends RepositorioMongoDB {
    retornaModelo() {
        return modelo;
    }
    buscar(usuario) {
        return modelo.find({usuario: usuario});

    }

    buscarTodos() {
        return modelo.find();

    }

    agregar(obUsuario) {
        return modelo.create({
            usuario: obUsuario.usuario,
            password: obUsuario.password,
            nombre: obUsuario.nombre,
            mail: obUsuario.mail,
            descripcion: obUsuario.descripcion,
            perfil: obUsuario.perfil,
            activo: obUsuario.activo,
            institucion_id: obUsuario.institucion_id
        })
    }
    eliminar(id) {
        return modelo.deleteOne({_id: id})
    }

    actualizar(id, obUsuario) {
        return modelo.findOneAndUpdate({
            _id: id,
            nombre: obUsuario.nombre,
            mail: obUsuario.mail,
            descripcion: obUsuario.descripcion,
            perfil: obUsuario.perfil,
            activo: obUsuario.activo
        });

    }

}

module.exports = Usuarios;
