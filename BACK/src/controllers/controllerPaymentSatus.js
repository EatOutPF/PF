const express = require('express')
const axios = require('axios')
const dotenv = require('dotenv')

async function webhook(reference) {
 
    const token = process.env.MERCADOPAGO_KEY
    console.log(reference)
    let data
    try {

        let url = `https://api.mercadopago.com/v1/payments/search?sort=id&criteria=desc&external_reference=${reference}&range=date_created&begin_date=NOW-30DAYS&end_date=NOW&access_token=${token}`
        let response = await axios.get(url)
        .then(res => data = res.data.results[0])
        console.log(data)

        if(data && data.status === 'approved' && data.status_detail === 'accredited') {
            

        }

        return data
    } catch (err) {
        throw new Error(err)
    }
    
    //   axios.post(`/sendemail`, { email: "cditoro@gmail.com", name : "Claudio", price: 1200}
    //   )
}
module.exports =  webhook 
