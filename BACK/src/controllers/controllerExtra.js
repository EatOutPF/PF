const mongoose = require("mongoose");
const { Extra } = require("../db");

async function postExtra (name) {
    if(!name) throw new error ("El nombre es obligatorio")
    const extra = new Extra({name})
    await extra.save()
    return `El extra ${name} fue creada exitosamente`
}

async function getExtra(name){
    if(name){
        const extra = await Extra.findOne({name: name })
        return extra
    }
    const extra = await Extra.find()
    return extra
}

async function putExtra(id, name){
    if (!id || !name) throw new Error("Hay datos requeridos sin declarar")

    const extra = await Extra.findByIdAndUpdate(id, { name: name })

    if (!extra) throw new Error(`No se encontraron extras con el id ${id}`)

    return `El extra ${extra.name} fue actualizada correctamente`
}

async function deleteExtra(id){
    if (!id) throw new Error("Debera informar el id")

    const extra = await Extra.findByIdAndDelete(id)

    return `El extra ${extra.name} fue eliminado correctamente`
}
module.exports = {
    postExtra,
    getExtra,
    putExtra,
    deleteExtra
}