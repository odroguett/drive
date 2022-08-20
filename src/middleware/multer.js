const { date } = require('joi');
const multer = require('multer');

let nombreArchivo;

var directorio = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./archivos')
    },
    filename: function  (req,file,cb)
    {
        console.log(file);
        nombreArchivo = Date.now() + file.originalname;
        cb(null, nombreArchivo);
    },
});
const subir = multer({storage : directorio});

module.exports =  subir
    
