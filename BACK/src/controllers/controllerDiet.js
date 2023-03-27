const mongoose = require("mongoose");
const { Diet } = require("../db");

async function postDiet (name) {
    if(!name) throw new error ("El nombre es obligatorio")
    const diet = new Diet({name})
    await diet.save()
    return `La dieta ${name} fue creada exitosamente`
}

async function getDiet(name){
    if(name){
        const diet = await Diet.findOne({name: name })
        return diet
    }
    const diet = await Diet.find()
    return diet
}

async function putDiet(id, name){
    if (!id || !name) throw new Error("Hay datos requeridos sin declarar")

    const diet = await Diet.findByIdAndUpdate(id, { name: name })

    if (!diet) throw new Error(`No se encontraron dietas con el id ${id}`)

    return `La dieta ${diet.name} fue actualizada correctamente`
}

async function deleteDiet(id){
    if (!id) throw new Error("Debera informar el id")

    const diet = await Diet.findByIdAndDelete(id)

    return `La Dieta ${diet.name} fue eliminado correctamente`
}
module.exports = {
    postDiet,
    getDiet,
    putDiet,
    deleteDiet
}