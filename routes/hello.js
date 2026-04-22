const express = require("express");
const HelloController = require("../controllers/hello");


const api = express.Router();

api.get("/hello", HelloController.getHello);//En esta función no es necesario llamarla con paréntesis

module.exports = api;