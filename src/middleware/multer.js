const { date } = require('joi');
const multer = require('multer');

var directorio = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./archivos')
    },
    filename: function  (req,file,cb)
    {
        cb(null, file.originalname + '-' + Date.now());
    },
});
const subir = multer({storage : directorio});


module.exports = subir;