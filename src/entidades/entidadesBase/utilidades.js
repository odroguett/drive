const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const variablesEntorno = require('../../variablesEntorno/config')
const archiver = require('archiver')
const fs = require('fs')
const { setTimeout } = require('timers/promises')
class Utilidades {
  static compararValoresEncriptacion(valor1, valor2) {
    console.log(valor1)
    console.log(valor2)

    return bcrypt.compare(valor1, valor2)
  }

  static generarToken(cargaUtil, expiracion) {
    console.log(cargaUtil)
    const llavePrivada = variablesEntorno.LLAVE_PRIVADA
    return jwt.sign(
      {
        cargaUtil,
      },
      llavePrivada,
      { expiresIn: expiracion },
    )
  }
  async generarZIP(pathOriginal, pathComprimido, nombreArchivo) {
    let archivo = pathComprimido + 'comprimido.zip'
    console.log(pathOriginal + nombreArchivo)
    if (!fs.existsSync(archivo)) {
      let writestream = fs.createWriteStream(archivo)
      let archive = archiver('zip')
      await archive.pipe(writestream)
      await archive.append(fs.createReadStream(pathOriginal + nombreArchivo), {
        name: nombreArchivo,
      })
      archive.on('on')
      await archive.finalize()
    }
    return archivo
  }
}

module.exports = Utilidades
