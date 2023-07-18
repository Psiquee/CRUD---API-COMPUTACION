const express = require('express');
const { connectToMongoDB, disconnectFromMongoDB } = require('./src/mongodb');
const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use((req, res, next) => {
    res.header("Content-Type", "application/json; charset=utf-8");
    next();
});

app.get("/", (req, res) => {
    res.status(200).end('Bienvenidos a la API de computadoras!');
});

//Ruta para recibir todos los articulos
app.get("/computacion", async (req, res) => {
    try {
        const client = await connectToMongoDB();
        if (!client) {
            res.status(500).send("Error al conectarse al MongoDB");
            return; 
        }
        const db = client.db('computacion');
        const computacion = await db.collection('computacion').find().toArray();
        res.json(computacion)
    } catch (error) {
        res.status(500).send("Error al obtener las computadoras de la base de datos");
    } finally {
        await disconnectFromMongoDB();
    }
});

// Ruta para obtener una producto por su ID
app.get("/computacion/:codigo", async (req, res) => {
    const productoId = parseInt(req.params.codigo);
    try {
      // Conexión a la base de datos
      const client = await connectToMongoDB();
      if (!client) {
        res.status(500).send("Error al conectarse a MongoDB");
        return;
      }

// Trayedo coleccion de bd para buscar por id/codigo

      const db = client.db("computacion");
      const producto = await db.collection("computacion").findOne({ codigo: productoId });
      if (producto) {
        res.json(producto);
      } else {
        res.status(404).send("Producto no encontrada");
      }
    } catch (error) {
      // Manejo de errores al obtener la fruta
      res.status(500).send("Error al obtener la fruta de la base de datos");
    } finally {
      // Desconexión de la base de datos
      await disconnectFromMongoDB();
    }
  });


  // Ruta para obtener productos x parte de su nombre

app.get("/computacion/nombre/:nombre", async (req, res) => {
    const productoQuery = req.params.nombre;
    let productoNombre = RegExp(productoQuery, "i");
    try {
        const client = await connectToMongoDB();
        if (!client) {
            res.status(500).send("Error al conectarse a MongoDB");
            return;
        }
        const db = client.db("computacion");
        const productos = await db.collection("computacion").find({ nombre: { $regex: productoNombre } }).toArray();
        if (productos.length > 0) {
            res.json(productos);
        } else {
            res.status(404).send("Producto no encontrado");
        }
    } catch (error) {
        res.status(500).send("Error al obtener los productos de la base de datos");
    } finally {
        await disconnectFromMongoDB();
    }
});


 // Ruta para obtener productos x categoria

    app.get("/computacion/categoria/:categoria", async (req, res) => {
    const productoCat = req.params.categoria;
    let productoNombre = RegExp(productoCat, "i");
    try {
        const client = await connectToMongoDB();
        if (!client) {
            res.status(500).send("Error al conectarse a MongoDB");
            return;
        }
        const db = client.db("computacion");
        const productos = await db.collection("computacion").find({ categoria: productoNombre  }).toArray();
        if (productos.length > 0) {
            res.json(productos);
        } else {
            res.status(404).send("Producto no encontrado");
        }
    } catch (error) {
        res.status(500).send("Error al obtener los productos de la base de datos");
    } finally {
        await disconnectFromMongoDB();
    }
});


// Ruta para agregar un nuevo recurso
app.post("/computacion", async (req, res) => {
    const nuevoProducto = req.body;
    try {
      if (nuevoProducto === undefined) {
        res.status(400).send("Error en el formato de datos a crear.");
        return;
    }
  
      // Conexión a la base de datos
      const client = await connectToMongoDB();
      if (!client) {
        res.status(500).send("Error al conectarse a MongoDB");
      }
  
      const db = client.db("computacion");
      const collection = db.collection("computacion");
      await collection.insertOne(nuevoProducto);
      console.log("Nueva producto creado");
      res.status(201).send(nuevoProducto);
    } catch (error) {
      // Manejo de errores al agregar la fruta
      res.status(500).send("Error al intentar agregar una nuevoProducto");
    } finally {
      // Desconexión de la base de datos
      await disconnectFromMongoDB();
    }
  });

  //Ruta para modificar un recurso
app.put("/computacion/:id", async (req, res) => {
    const productoId = parseInt(req.params.id);
    const nuevoPrecio = req.body.precio;
    try {
      if (!nuevoPrecio) {
        res.status(400).send("Error en el formato de datos a crear.");
      }
  
      // Conexión a la base de datos
      const client = await connectToMongoDB();
      if (!client) {
        res.status(500).send("Error al conectarse a MongoDB");
      }
  
      const db = client.db("computacion");
      const collection = db.collection("computacion");
  
      await collection.updateOne({ codigo: productoId }, { $set:{ precio: nuevoPrecio} });
  
      console.log("Precio Modificado");
  
      res.sendStatus(200);; /*FALTA AGREGRAR MENSAJE DE QUE EL PRECIO SE MODIFICO CORRECTAMENTE SIN QUE SALTE ERROR */
    } catch (error) {
      // Manejo de errores al modificar la fruta
      res.status(500).send("Error al modificar precio");
    } finally {
      // Desconexión de la base de datos
      await disconnectFromMongoDB();
    }
  });
  


  // Ruta para eliminar un recurso
app.delete("/computacion/:id", async (req, res) => {
    const productoId = parseInt(req.params.id);
    try {
      if (!productoId) {
        res.status(400).send("Error en el formato de datos a crear.");
        return;
      }
  
      // Conexión a la base de datos
      const client = await connectToMongoDB();
      if (!client) {
        res.status(500).send("Error al conectarse a MongoDB");
        return;
      }
  
      // Obtener la colección de frutas, buscar la fruta por su ID y eliminarla
      const db = client.db("computacion");
      const collection = db.collection("computacion");
      const resultado = await collection.deleteOne({ codigo : productoId });
      if (resultado.deletedCount === 0) {
        res
          .status(404)
          .send("No se encontró ningun producto con el id seleccionado.");
      } else {
        console.log("Producto Eliminado");
        res.status(204).send();
      }
    } catch (error) {
      // Manejo de errores al obtener las frutas
      res.status(500).send("Error al eliminar la producto");
    } finally {
      // Desconexión de la base de datos
      await disconnectFromMongoDB();
    }
  });




// Puerto de servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
  });
