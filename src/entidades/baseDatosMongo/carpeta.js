
const RepositorioMongoDB = require("./RepositorioMongoDB");
const modelo = require("../../baseDatos/modelo/carpetaModelo");

class Carpeta extends RepositorioMongoDB {
    retornaModelo() {
        return modelo;
    }
    buscar(id) {
        return modelo.find({_id: id});

    }

    buscarTodos() {
        console.log("buscar carpeta todos")
        return modelo.find();

    }

    agregar(obCarpeta) {
        
        return modelo.create({
            _id: obCarpeta.id,
            nombre: obCarpeta.nombre,
            
        })
    }
    eliminar(id) {
        return modelo.deleteOne({_id: id})
    }

    actualizar(id, obCarpeta) {
        return modelo.findOneAndUpdate({
            _id: id,
            nombre: obCarpeta.nombre,
            
        });

    }

    agregarArchivo(obCarpeta) {
        console.log(obCarpeta);

      return  modelo.updateOne(
            { id_: "2" },
            { $push: { archivo : [ obCarpeta] } },
            
          );
    }

}

module.exports = Carpeta;
