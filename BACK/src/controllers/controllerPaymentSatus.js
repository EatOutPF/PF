const express = require('express')
const dotenv = require('dotenv')

async function webhook(data) {

    var id_venta = data.id
    const token = process.env.MERCADOPAGO_KEY

        let url = `https://api.mercadopago.com/v1/payments/${id_venta}?access_token=${token}`;
        let response = await axios(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        let myJson = await response.json();
        console.log(myJson);

        return [myJson]
    }

module.exports =  webhook 
