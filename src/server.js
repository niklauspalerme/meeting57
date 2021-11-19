/////////////////////////////////////////////////////////////
// Variables Iniciales 


const express = require('express');
const helmet = require('helmet');
const { userRouter } = require('./routers/user');


/////////////////////////////////////////////////////////////
// Función Principal


const ServerUp = (port = 8090, message= 'The server is ready') =>{

    /////////////////////////////////////////////////////////////
    // Variables 

    const server = express();


    /////////////////////////////////////////////////////////////
    // Global Middlewares

    server.use(express.json());
    server.use(express.urlencoded({extended: false}));
    server.use(helmet());

    /////////////////////////////////////////////////////////////
    // Routers

    server.use('/usuarios', userRouter());

    /////////////////////////////////////////////////////////////
    //Puerto

    server.listen( port , ()=>{
        console.log(`${message} in port ${port}`)
    })

    return server;
}


/////////////////////////////////////////////////////////////
// Exportamos


module.exports= {ServerUp}