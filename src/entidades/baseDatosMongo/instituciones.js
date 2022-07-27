
const RepositorioMongoDB = require("./RepositorioMongoDB");
const modelo = require("../../baseDatos/modelo/institucionModelo");

class Instituciones extends RepositorioMongoDB {
    retornaModelo() {
        return modelo;
    }
    buscar(id) {
        return modelo.find({_id: id});

    }

    buscarTodos() {
        return modelo.find();

    }

    agregar(obInstitucion) {
        console.log (obInstitucion)
        return modelo.create({
            _id: obInstitucion.id,
            descripcion: obInstitucion.descripcion,
            
        })
    }
    eliminar(id) {
        return modelo.deleteOne({_id: id})
    }

    actualizar(id, obInstitucion) {
        return modelo.findOneAndUpdate({
            _id: id,
            descripcion: obInstitucion.descripcion,
            
        });

    }

}

module.exports = Instituciones;
