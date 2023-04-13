const express = require('express')
const dotenv = require('dotenv')


const webhookMercadopago = (req, res) => {

    var data = req.body
    res.sendStatus(200)

    console.log(`** El ID de pago es: ${data.data.id} **`)

    var id_venta = data.data.id
    const token = process.env.MERCADOPAGO_KEY


    async function obtenerDatos() {

        let url = `https://api.mercadopago.com/v1/payments/${id_venta}?access_token=${token}`;
        let response = await axios(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        let myJson = await response.json();
        console.log(myJson);

        return [myJson]
    }

    
}




module.exports = { webhookMercadopago }