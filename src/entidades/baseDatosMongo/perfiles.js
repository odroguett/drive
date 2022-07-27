
const RepositorioMongoDB = require("./RepositorioMongoDB");
const modelo = require("../../baseDatos/modelo/perfilModelo");

class Perfiles extends RepositorioMongoDB {
    retornaModelo() {
        return modelo;
    }
    buscar(id) {
        return modelo.find({_id: id});

    }

    buscarTodos() {
        return modelo.find();

    }

    agregar(obPerfil) {
        
        return modelo.create({
            _id: obPerfil.id,
            descripcion: obPerfil.descripcion,
            
        })
    }
    eliminar(id) {
        return modelo.deleteOne({_id: id})
    }

    actualizar(id, obPerfil) {
        return modelo.findOneAndUpdate({
            _id: id,
            descripcion: obPerfil.descripcion,
            
        });

    }

}

module.exports = Perfiles;
