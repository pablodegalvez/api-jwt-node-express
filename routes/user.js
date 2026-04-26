const express = require("express");
const multer  = require('multer');//Es un middleware. Lo estoy usando en lugar de connect-multiparty por estar más actualizado
const path = require("path");


const UserController = require("../controllers/user");

const md_auth = require("../middlewares/authenticated");

//Para poder ver el nombre normal del archivo y la extensión es necesario hacer lo siguiente:
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/");
    },
    filename: (req, file, cb) => {
        // Creamos un nombre único: timestamp + extensión original
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

//Todo lo referente a Multer viene en la documentación de npm bastante bien. Aquí se ha aplicado lo básico
//Defino donde se van a guardar
const upload = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) => {
        // Definimos los tipos permitidos (MIME types)
        const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

        if (allowedTypes.includes(file.mimetype)) {
            // Si el tipo es correcto, aceptamos el archivo (true)
            cb(null, true);
        } else {
            // No lanza error crítico, solo no sube el archivo
            cb(null, false);
        }
    },
    limits: {
        fileSize: 2 * 1024 * 1024 // Límite de 2MB
    }
});


const api = express.Router();

api.post("/register", UserController.register);
api.post("/login", UserController.login);


api.get("/protected", [md_auth.ensureAuth], UserController.protected);//Se le añade un [] para el middleware.
//Se añade un array porque un endpoint puede tener más de un middleware.

api.put("/upload-avatar/:id", [md_auth.ensureAuth, upload.single('avatar')],  UserController.uploadAvatar);
//image es el nombre del campo donde viene el archivo
// El archivo estará disponible en req.file. En este caso hay que vigilar que middleware viene primero.

api.get("/avatar/:avatarName", UserController.getAvatar);

module.exports = api;