# CRUD - Actividad integradora.

1.1 [Create](#create)

1.2 [Read](#read)

1.3 [Update](#update)

1.4 [Delete](#delete)

### API de Computacion
Esta documentación describe las peticiones de creación (create), lectura (read), actualización (update) y eliminación (delete) disponibles en la API de Computacion. Estas peticiones permiten interactuar con elementos existentes en la base de datos(MongoDB), permitiendo seleccionar por categorias, modificar exclusivamente precio de un producto, insertar uno nuevo o eliminar un objeto existente.

### Requisitos previos
Antes de realizar peticiones de creación, asegúrate de tener la siguiente información y configuración:
- Acceso a la URL base de la API: `http://localhost:3008`
- Credenciales de autenticación, si es necesario.
- Conocimiento de los campos y formatos requeridos para crear un elemento en la API.
## Create
### Peticiones disponibles
A continuación se presentan las peticiones de creación disponibles en la API de computacion:
### Crear un nuevo objeto
- **Descripción:** Crea un nuevo registro en la base de datos.
- **URL:** `https://localhost:3008/computacion`
- **Método:** POST
- **Cuerpo de la petición:** Debes proporcionar los datos necesarios en el cuerpo de la petición en formato JSON. Asegúrate de incluir todos los campos requeridos para crear un registro.
Ejemplo de cuerpo de la petición:
```json
{
    "codigo": 9,
    "nombre": "Tarjeta de Video",
    "precio": 249.99,
    "categoria": "Partes de computadoras"
  }
```
- **Respuesta exitosa:** La petición devuelve un código de estado 201 (Created) y la respuesta contiene los detalles del nuevo registro creado.
- **Respuesta de error:** Si la petición falla, se devolverá un código de estado apropiado (por ejemplo, 400 para errores de validación) y la respuesta contendrá información adicional sobre el error.
- **Respuesta de error al conectar con base de datos :** Si no se logra conectar con la base de datos se devolverá un código de estado apropiado (por ejemplo, 500 si no se pudo conectar correctamente) y la respuesta contendrá información adicional sobre el error.
### Notas adicionales
- Asegúrate de cumplir con los requisitos de autenticación, si es necesario, para realizar peticiones de creación.
- Verifica los campos requeridos y los formatos esperados en la documentación de la API para cada tipo de elemento que desees crear.
- Utiliza las respuestas de error para identificar y solucionar problemas en caso de que la petición de creación falle.
## Read
## Peticiones disponibles
A continuación se presentan las peticiones de lectura, en la API de Frutas:
### Leer un registro
- **Descripción:** Obtiene los detalles de un registro específico.
- **URL:** `http://localhost:3008/computacion/{codigo}`
- **Método:** GET
- **Parámetros de la petición:** Reemplaza `{codigo}` en la URL con el identificador del registro que deseas obtener.
- **Respuesta exitosa:** La petición devuelve un código de estado 200 (OK) y la respuesta contiene los detalles del registro solicitado.
- **Respuesta de error:** Si la petición falla o el registro no existe, se devolverá un código de estado apropiado (por ejemplo, 404 si el registro no se encuentra) y la respuesta contendrá información adicional sobre el error.

### Leer productos de una misma categoria
- **Descripción:** Obtiene los elementos de una categoria específica.
- **URL:** `http://localhost:3008/computacion/{categoria}`
- **Método:** GET
- **Parámetros de la petición:** Reemplaza `{categoria}` en la URL con la categoria del objeto que deseas obtener.
- **Respuesta exitosa:** La petición devuelve un código de estado 200 (OK) y la respuesta contiene los detalles del registro solicitado.
- **Respuesta de error:** Si la petición falla o el registro no existe, se devolverá un código de estado apropiado (por ejemplo, 404 si el registro no se encuentra) y la respuesta contendrá información adicional sobre el error.
- **Respuesta de error al conectar con base de datos :** Si no se logra conectar con la base de datos se devolverá un código de estado apropiado (por ejemplo, 500 si no se pudo conectar correctamente) y la respuesta contendrá información adicional sobre el error.

### Leer productos por parte de su nombre
- **Descripción:** Obtiene los elementos con una parte de su nombre.
- **URL:** `http://localhost:3008/nombre/{nombre}`
- **Método:** GET
- **Parámetros de la petición:** Reemplaza `{nombre}` en la URL con una parte del nombre del producto sin importar si es en mayuscula, minusculas o ambas.
- **Respuesta exitosa:** La petición devuelve un código de estado 200 (OK) y la respuesta contiene los detalles del nombre solicitado.
- **Respuesta de error:** Si la petición falla o el registro no existe, se devolverá un código de estado apropiado (por ejemplo, 404 si el registro no se encuentra) y la respuesta contendrá información adicional sobre el error.
- **Respuesta de error al conectar con base de datos :** Si no se logra conectar con la base de datos se devolverá un código de estado apropiado (por ejemplo, 500 si no se pudo conectar correctamente) y la respuesta contendrá información adicional sobre el error.

## Update
### Actualizar un recurso
- **Descripción:** Modifica el precio de un objeto de la API.
- **URL:** `http://localhost:3008/computacion/{codigo}`
- **Método:** PUT
- **Parámetros de la petición:** Reemplaza `{codigo}` en la URL con el identificador del objeto que deseas actualizar.
- **Cuerpo de la petición:** Debes proporcionar los nuevos datos del objeto en el cuerpo de la petición en formato JSON. Asegúrate de incluir el campo requerido para la actualizacion.
Ejemplo de cuerpo de la petición:
```json
{
    "precio": 500,
  }
```
- **Respuesta exitosa:** La petición devuelve un código de estado 200 (OK) y la respuesta contiene los detalles actualizados del objeto.
- **Respuesta de error:** Si la petición falla, se devolverá un código de estado apropiado (por ejemplo, 400 para errores de validación) y la respuesta contendrá información adicional sobre el error.
## Delete
### Eliminar un registro
- **Descripción:** Elimina un registro existente de la base de datos.
- **URL:** `http://localhost:3008/computacion/{codigo}`
- **Método:** DELETE
- **Parámetros de la petición:** Reemplaza `{codigo}` en la URL con el identificador del registro que deseas eliminar.
- **Respuesta exitosa:** La petición devuelve un código de estado 204 (No Content) si la eliminación fue exitosa.
- **Respuesta de error:** Si la petición falla o el registro no existe, se devolverá un código de estado apropiado (por ejemplo, 404 si el registro no se encuentra) y la respuesta contendrá información adicional sobre el error.
## Notas adicionales
- Asegúrate de cumplir con los requisitos de autenticación, si es necesario, para realizar las peticiones de lectura, actualización o eliminación.
- Verifica los identificadores, parámetros y formatos esperados en la documentación de la API para cada tipo de operación.
- Utiliza las respuestas de error para identificar y solucionar problemas en caso de que alguna petición falle.

