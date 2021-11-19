/////////////////////////////////////////////////////////////
// Variables

const Sequelize = require("sequelize");
const { createUserModel } = require("./models/user");
const models = {}; //Variable para acceder a los modelos
let db = null; // Vairable para acceder a la conexión


/////////////////////////////////////////////////////////////
// Funciones


//1- Función para Conecta a la DB
const connect = async (host, port, username, password, database) => {
    
   // a) Si existe la DB
  try{

    const connection = new Sequelize({
      database,
      username,
      password,
      host,
      port,
      dialect: 'mysql', 
    });
    

    //Guardamos los modelos 
    models.User = createUserModel(connection);

    //Autentificamos la conexion
    await connection.authenticate();
    //Sincronizamos los modelos
    await connection.sync();

    console.log('La Base de Datos existe.....')

    //Capturamos la conexión
    db = connection;
   
    console.log('Connection has been established successfully.....');


  }catch(error){
    
    if (error.original.errno === 1049){

      let otraConnection = new Sequelize({
        username,
        password,
        host,
        port,
        dialect: 'mysql', 
      });

      await otraConnection.query(`CREATE DATABASE ${database}`)
          .then(() => {
            console.error('Database doesnt exists, lets create a new one.....')
          })
        	.catch(errorx => console.error('Unable to connect to the database: ', errorx));

      await createSyncTables(otraConnection, host, port, username, password, database);

	  } 
  }

}


//2) Función Sincronizacion De Tabalas
const createSyncTables =  async (otraConnection, host, port, username, password, database) => {

    try{
  
        otraConnection = new Sequelize({
            database,
            username,
            password,
            host,
            port,
            dialect: 'mysql', 
        });
      
        //Guardamos los modelos 
        models.User = createUserModel(otraConnection);
    
        await otraConnection.authenticate();
        await otraConnection.sync();
  
        db = otraConnection;
    
        console.log('Connection has been established successfully.....')
  
    }catch(error){
  
      console.log("Error aca en createSyncTables.... ", error);
    }
  }


//3) Función para obtener el Modelo
const  getModel = (name)=> {

    if (!models[name]) {
      global.console.log('No existe el modelo');
      return null;
    }

    return models[name]
  }
  
  
//4) Función para obtener la conexión
const dbConexion =  () => {
    return db;
  }
  

/////////////////////////////////////////////////////////////
// Exportamos

  module.exports = {
    connect,
    getModel,
    dbConexion
  };