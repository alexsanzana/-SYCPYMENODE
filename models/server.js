const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const { dbConnection } = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            auth: '/api/auth',
            buscar: '/api/buscar',
            categorias: '/api/categorias',
            observaciones: '/api/observaciones',
            codigos: '/api/codigos',
            productos: '/api/productos',
            usuarios: '/api/usuarios',
            uploads: '/api/uploads',
            tipos: '/api/tipos',
            registrosTipos: '/api/registrosTipos',
            regiones: '/api/regiones',
            comunas: '/api/comunas',
            proveedores: '/api/proveedores',
            empleados: '/api/empleados',
            clientes: '/api/clientes',
            pagos: '/api/pagos',
            imagenesProductos: '/api/imagenesProductos',
        }
        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';
        // Conectar a Base de Datos
        this.conectarDb();
        // Middlewares
        this.middlewares();
        // Rutas de mi aplicación
        this.routes();
    }

    async conectarDb() {
        await dbConnection();
    }

    middlewares() {
        // CORS
        this.app.use(cors());
        // Lectura y parseo del Body
        this.app.use(express.json());
        // Directorio Publico
        this.app.use(express.static('public'));
        // Fileupload - carga de archivos
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.buscar, require('../routes/buscar'));
        this.app.use(this.paths.categorias, require('../routes/categorias'));
        this.app.use(this.paths.observaciones, require('../routes/observaciones'));
        this.app.use(this.paths.codigos, require('../routes/codigos'));
        this.app.use(this.paths.productos, require('../routes/productos'));
        this.app.use(this.paths.usuarios, require('../routes/usuarios'));
        this.app.use(this.paths.uploads, require('../routes/uploads'));
        this.app.use(this.paths.tipos, require('../routes/tipos'));
        this.app.use(this.paths.registrosTipos, require('../routes/registros-tipos'));
        this.app.use(this.paths.regiones, require('../routes/regiones'));
        this.app.use(this.paths.comunas, require('../routes/comunas'));
        this.app.use(this.paths.proveedores, require('../routes/proveedores'));
        this.app.use(this.paths.empleados, require('../routes/empleados'));
        this.app.use(this.paths.clientes, require('../routes/clientes'));
        this.app.use(this.paths.pagos, require('../routes/pagos'));
        this.app.use(this.paths.imagenesProductos, require('../routes/imagenes-productos'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor Corriendo en Puerto ', this.port);
        });
    }

}

module.exports = Server;