const dotenv = require ('dotenv'); 
dotenv.config(); 
const {MongoClient} = require('mongodb');


//Acceso al motor-cluster mongodb
const URI = process.env.MONGODB_URLSTRING;
const client = new MongoClient(URI);

//Conectando a BD
const connectToMongoDB = async ()=> {
   try{ await client.connect();
        console.log('Conectado a MongoDB');
        return client;
} catch(error){
    console.error('Error al conectar a MongoDB',error);
    return null;
} 
}
// Desconectando BD
async function disconnectFromMongoDB(){
    try {
        await client.close();
            console.log('Desconectando de MongoDB');
    } catch (error){
        console.error('Error al desconectar MongoDB', error);
        return null;
    }
}

module.exports = {connectToMongoDB, disconnectFromMongoDB};