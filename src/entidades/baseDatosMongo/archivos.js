const RepositorioMongoDB = require('./RepositorioMongoDB')
const modelo = require('../../baseDatos/modelo/archivoModelo')

class Archivos extends RepositorioMongoDB {
  retornaModelo() {
    return modelo
  }
  buscar(id) {
    return modelo.find({ _id: id })
  }

  maximoArchivo()
  {

    return modelo.find({},{numero:1,_id:0}).sort({numero: -1}).limit(1);
  }

  buscarArchivos(idCarpeta) {
    console.log(idCarpeta);
    return modelo.find({ id_carpeta: idCarpeta  })
  }

  buscarTodos() {
    return modelo.find()
  }

  agregar(obArchivo) {
    return modelo.create({
      nombre: obArchivo.nombre,
      usuario: obArchivo.usuario,
    })
  }
  eliminar(link) {
    return modelo.deleteOne({ link: link })
  }

  actualizar(id, obArchivo) {
    return modelo.findOneAndUpdate({
      _id: id,
      nombre: obArchivo.nombre,
    })
  }
  agregarArchivo(obArchivo) {
    console.log(obArchivo)

    return modelo.create({
      descripcion: obArchivo.descripcion,
      texto: obArchivo.texto,
      id_carpeta: obArchivo.id_carpeta,
      link: obArchivo.link,
      desactivar: obArchivo.desactivar,
      nombre:obArchivo.nombre,
      numero:obArchivo.numero,
    })
  }
}

module.exports = Archivos
