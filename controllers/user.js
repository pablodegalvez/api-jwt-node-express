const fs = require("fs");
const path = require("path");

const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const jwt = require("../services/jwt");

async function register(req, res) {
    const user = new User(req.body);
    const { email, password} = req.body;
    

    try {
        if(!email) throw { msg: "El email es obligatorio"};
        if(!password) throw {msg: "La contraseña es obligatoria"};

        //Revisamos si el email está en uso revisando la base de datos
        const foundEmail = await User.findOne({email});
        if(foundEmail) throw { msg: "El email ya está en uso"};

        const salt = bcryptjs.genSaltSync(10);
        user.password = await bcryptjs.hash(password, salt);
        await user.save();

        res.status(200).send(user);

    } catch (error) {
        res.status(500).send(error);
    }

}

async function login(req, res) {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({email});
        if(!user) throw { msg: "Error en el email o contraseña"};

        const passwordSuccess = await bcryptjs.compare(password, user.password);
        if(!passwordSuccess) throw { msg: "--Error en el email o contraseña"};


        res.status(200).send({ token: jwt.createToken(user, "12h")});
    } catch (error) {
        res.status(500).send(error);
    }
}

function protected (req, res) {
    res.status(200).send({msg:"Contenido del Endpoint protegido"});
}

async function uploadAvatar(req, res) {
    const params = req.params;


    // Validar si el filtro rechazó el archivo (tipo incorrecto)
    if (!req.file) {
        return res.status(400).send({ 
            msg: "No se ha subido ningún archivo o el formato no es válido (solo JPG/PNG)" 
        });
    }


    try {
        // 1. Buscamos el usuario usando await
        const userData = await User.findById(params.id);

        if (!userData) {
            return res.status(404).send({ msg: "No se ha encontrado el usuario" });
        }

        // 2. Con Multer, el archivo está en req.file
        if (req.file) {
            // Obtenemos el nombre del archivo guardado
            const fileName = req.file.filename; 


            // 3. Aquí guardarías el nombre en la base de datos
            userData.avatar = fileName; 
            await userData.save();

            return res.status(200).send({ msg: "Avatar actualizado", avatar: fileName });
        } else {
            return res.status(400).send({ msg: "No se ha subido ninguna imagen" });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).send({ msg: "Error del servidor al buscar el usuario" });
    }
}

//Para enviar la imagen al cliente.
function getAvatar(req, res) {
    const {avatarName} = req.params; 
    const filePath = `./uploads/${avatarName}`;

    fs.stat(filePath, (err, stat) => {
        if(err) {
            res.status(404).send({msg: "El avatar no existe"});
        } else {
            res.sendFile(path.resolve(filePath));
        }
    })
}



module.exports = {
    register,
    login,
    protected,
    uploadAvatar,
    getAvatar,
};