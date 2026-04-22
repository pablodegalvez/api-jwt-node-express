const Task = require("../models/task");

//Crea una tarea
async function createTask ( req, res) {
    const task = new Task();
    const params = req.body;

    task.title = params.title;
    task.description = params.description;


    try {
        const taskStore = await task.save();

        if(!taskStore) {
            res.status(400).send({ msg: "No se ha guardado la tarea"});
        } else {
            res.status(200).send({ task: taskStore });
        }


    } catch (error) {
        res.status(500).send(error);
    }



}

//Nos muestra las tareas
async function getTasks ( req, res ) {
    try {

        //const tasks = await Task.find(); Con esto solo vale, pero justo abajo lo voy a poner para que ordene por fecha.
        //const tasks = await Task.find().sort( {created_at: -1} );//Aqui ordenamos de más viejo a más nuevo.
        //Justo abajo voy a añadir que solo me muestre las que están sin terminar:
        const tasks = await Task.find({completed: false}).sort( {created_at: -1} );

        if(!tasks) {
            res.status(400).send({ msg: "Error al obtener las tareas" });
        }else {
            res.status(200).send(tasks);
        }

    } catch (error) {
        res.status(500).send(error);
    }
}

//Buscamos tarea específica por id
async function getTask (req, res) {
    const idTask = req.params.id;//obtenemos el id pasado por la url
    try {
        const task = await Task.findById(idTask);//Al poner Task tengo acceso a todas las funciones de mongoose.

        if(!task) {
            res.status(400).send({ msg: "No se ha encontrado la tarea indicada" });
        }else {
            res.status(200).send(task);
        }

    } catch (error) {
        res.status(500).send(error);
    }
}

async function updateTask(req, res) {
    const idTask = req.params.id;

    const params = req.body;

    try {
        
        const task = await Task.findByIdAndUpdate(idTask, params);

        if(!task) {
            res.status(400).send({msg: "No se ha podido actualizar la tarea"});
        }else{
            res.status(200).send({msg: "Actualización completada"});
        }

    } catch (error) {
        res.status(500).send(error);
    }


}

async function deteteTask(req, res) {
    const idTask = req.params.id;

    try {
        
        const task = await Task.findByIdAndDelete(idTask);

        if(!task) {
            res.status(400).send({msg: "No se ha podido eliminar la tarea"});
        }else {
            res.status(200).send({msg: "Tarea eliminada correctamente"});
        }

    } catch (error) {
        res.status(500).send(error);
    }

}

module.exports = {
    createTask,
    getTasks,
    getTask,
    updateTask,
    deteteTask,
};