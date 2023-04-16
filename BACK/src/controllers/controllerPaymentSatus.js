const express = require('express')
const axios = require('axios')
const dotenv = require('dotenv')

async function webhook(id) {
 
    const token = process.env.MERCADOPAGO_KEY
    console.log(id)

    let data
    try {

        let url = `https://api.mercadopago.com/v1/payments/search?sort=id&criteria=desc&external_reference=${id}&range=date_created&begin_date=NOW-30DAYS&end_date=NOW&access_token=${token}`
        let response = await axios.get(url)
        .then(res => data = res.data)
        console.log(data)
        // if(!id.includes('-')) {
        // let url = `https://api.mercadopago.com/v1/payments/${id}?access_token=${token}`;
        // let response = await axios 
        // .get(url)
        // .then(res => data = res.data )
        // console.log(data);
        // } else {
        //     let url =   `https://api.mercadopago.com/checkout/preferences/${id}?access_token=${token}` 
        //     let response = await axios 
        // .get(url)
        // .then(res => data = res.data )
        
        // console.log(data);
        // }

        return data
    } catch (err) {
        throw new Error(err)
    }
    }

// async function webhook(props) {
//     console.log(props)
//     const token = process.env.MERCADOPAGO_KEY
    
//     let id = props.payment_id === 'null' ? props.preference_id : props.payment_id
//     let data
    
//     try {
//         if(!id.includes('-')) {
//         let url = `https://api.mercadopago.com/v1/payments/${id}?access_token=${token}`;
//         let response = await axios 
//         .get(url)
//         .then(res => data = res.data )
//         axios.post(`/sendemail`, { email: "cditoro@gmail.com", name : data, price: 1200})
//         } else {
//             let url =   `https://api.mercadopago.com/checkout/preferences/${id}?access_token=${token}` 
//             let response = await axios 
//         .get(url)
//         .then(res => data = res.data )
        
//         console.log(data);
//         }

//         return data
//     } catch (err) {
//         throw new Error(err)
//     }
//     }


module.exports =  webhook 
