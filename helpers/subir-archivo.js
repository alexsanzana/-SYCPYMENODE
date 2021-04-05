const path = require('path');
const { v4: uuidv4 } = require('uuid');

const subirArchivo = (files, extensionesValidas = ['jpg', 'jpeg', 'png', 'gif'], carpeta = '') => {

    return new Promise((resolve, reject) => {
        const { archivo } = files;
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[nombreCortado.length - 1];
        // validar la extension es necesario obterlo de un archivo de configuracion 
        if (!extensionesValidas.includes(extension)) {
            return reject(`La extension ${extension} no es permitida ${extensionesValidas}`)
        }
        const nombreFinal = uuidv4() + '.' + extension;
        const uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreFinal);
        archivo.mv(uploadPath, (err) => {
            if (err) {
                reject(err);
            }
            resolve(nombreFinal);
        });
    });

}


module.exports = {
    subirArchivo
}