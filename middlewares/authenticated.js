const dayjs = require("dayjs");//Sutituyo moment por dayjs
const jwt = require("../services/jwt");

const SECRET_KEY = "Jpoiua885kjs8OD8lksjdjkf984jg8ña";

function ensureAuth(req, res, next) {
    if(!req.headers.authorization) {
        return res.status(403).send( { msg: "La petición no tiene la cabecera de Autenticación"});
    }



    const token = req.headers.authorization.replace(/['"]+/g, "");

    try {
        const payload = jwt.decodeToken(token, SECRET_KEY);

        if(payload.exp <= dayjs().unix()){
            return res.status(400).send({msg: "El token ha expirado"});
        }
        req.user = payload;
    } catch (error) {
        return res.status(400).send({msg: "Token invalido"});
    }

    
    next();

}


module.exports = {
    ensureAuth,
}