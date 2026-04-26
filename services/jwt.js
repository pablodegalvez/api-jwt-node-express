const jwt = require("jsonwebtoken");

const SECRET_KEY = "Jpoiua885kjs8OD8lksjdjkf984jg8ña";

function createToken (user, expiresIn) {
    const {id, email} = user;
    const payload = {id, email};
    return jwt.sign(payload, SECRET_KEY, { expiresIn });

}


function decodeToken(token) {
    return jwt.decode(token, SECRET_KEY);
}

module.exports = {
    createToken,
    decodeToken,
}

/*
Efectivamente, este código es una utilidad para gestionar JSON Web Tokens (JWT). Es la forma estándar de 
"darle un carnet de identidad" a un usuario después de que se registra o hace login en tu API.
Para entender qué hace cada parte con "ojos de programador", vamos a desglosarlo:

1. La SECRET_KEY (La llave maestra)
Es la cadena de texto que el servidor usa para firmar los tokens.
Por qué es importante: Si alguien roba esta clave, podría generar tokens falsos y entrar en tu aplicación como 
si fuera cualquier usuario. En un entorno real, esta clave nunca se escribe directamente en el código; 
se guarda en un archivo .env.

2. Función createToken (El carnet de identidad)
Esta función recibe los datos del usuario y devuelve un string largo y codificado.
Payload: Es la información que "viaja" dentro del token. Aquí solo guardas el id y el email. Regla de oro: 
Nunca metas contraseñas ni datos sensibles aquí, porque el payload es fácil de leer para cualquiera.
jwt.sign: Aquí ocurre la magia. Toma el payload, lo junta con la SECRET_KEY y aplica un algoritmo matemático 
(normalmente HMAC SHA256) para crear una firma digital.
expiresIn: Define cuánto tiempo es válido el carnet (ej. "2h", "7d"). Pasado ese tiempo, el servidor lo rechazará.

3. Función decodeToken (Leer el carnet)
Esta función simplemente traduce el token de vuelta a un objeto JSON para que puedas leer qué usuario es.
Nota importante: jwt.decode solo lee el contenido, no verifica si la firma es válida. Para proteger rutas privadas en tu servidor,
 normalmente usarás jwt.verify, que comprueba que el token no haya sido manipulado.

La visión "transparente": ¿Qué es un JWT realmente?
Si copias un token generado por este código y lo pegas en jwt.io, verás que tiene tres partes separadas por puntos:
- Header (Rojo): Dice qué algoritmo se usó.
- Payload (Morado): Tus datos (id, email) codificados en Base64 (un sistema que convierte bytes en texto legible).
- Signature (Azul): El resultado de mezclar el Header + Payload + tu SECRET_KEY.
¿Ves la conexión con lo que hablábamos de C?
En C verías que la firma es el resultado de procesar los bytes del mensaje a través de una función matemática. 
Si alguien cambia aunque sea un solo bit en el ID del usuario, la firma ya no coincidirá y tu servidor 
sabrá inmediatamente que alguien está intentando hackear la sesión.
¿Cómo se conecta esto con tu código de Registro?
En tu función register, después de hacer el user.save(), lo normal sería llamar a esta función:
javascript
const token = createToken(user, "24h");
res.status(200).send({ token });
*/