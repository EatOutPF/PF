const mongoose = require("mongoose");
const { Section } = require("../db");

async function postSection(name) {
    if (!name) throw new Error("El nombre es obligatorio")

    const section = new Section(name)

    const resultado = await section.save()

    return `La sección ${name} fue creada`
}

async function getSection(name) {
   if (name) {
    const section = await Section.findOne({name: name})
    return section
   } 

   const section = await Section.find()

   return section
}

async function putSection(id, name) {
    if (!id || !name) throw new Error("Hay datos requeridos sin declarar")

    const section = await Section.findByIdAndUpdate(id, { name: name })

    if (!section) throw new Error(`No se encontraron secciones con el id ${id}`)

    return `La sección ${section.name} fue actualizada correctamente`
}

async function deleteSection(id) {
    if (!id) throw new Error("Debera informar el id")

    const section = await Section.findByIdAndDelete(id)

    return `La sección ${section.name} fue eliminado correctamente`
}

module.exports = {
    postSection,
    getSection,
    putSection,
    deleteSection,
}