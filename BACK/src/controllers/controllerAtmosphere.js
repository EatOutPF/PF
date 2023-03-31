const mongoose = require("mongoose");
const {Atmosphere } = require("../db");

async function postAtmosphere (name) {
    if(!name) throw new error ("El nombre es obligatorio")
    const atmosphere = new Atmosphere({name})
    await atmosphere.save()
    return `La atmósfera ${name} fue creada exitosamente`
}

async function getAtmosphere(name){
    if(name){
        const atmosphere = await Atmosphere.findOne({name: name })
        return atmosphere
    }
    const atmosphere = await Atmosphere.find()
    return atmosphere
}

async function putAtmosphere(id, name){
    if (!id || !name) throw new Error("Hay datos requeridos sin declarar")

    const atmosphere = await Atmosphere.findByIdAndUpdate(id, { name: name })

    if (!atmosphere) throw new Error(`No se encontraron Atmosphereas con el id ${id}`)

    return `La atmósfera ${Atmosphere.name} fue actualizada correctamente`
}

async function deleteAtmosphere(id){
    if (!id) throw new Error("Debera informar el id")

    const atmosphere = await Atmosphere.findByIdAndDelete(id)

    return `La atmósfera ${Atmosphere.name} fue eliminado correctamente`
}
module.exports = {
    postAtmosphere,
    getAtmosphere,
    putAtmosphere,
    deleteAtmosphere
}