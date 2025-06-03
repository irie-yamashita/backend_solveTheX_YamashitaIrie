# DOCUMENTACIÓN backend_solveTheX_YamashitaIrie

## Descripción
Este proyecto es una API REST que gestiona tareas (TODOs). Permite a los usuarios registrarse, iniciar sesión y ver los diferentes TODOs que hay. Sólo aquellos que inicien sesión pueden gestionar las tareas como agregar, actualizar o eliminar.

## Instalación y configuración
1. Clonar el repositorio
2. Instalar dependencias
`npm install`    
├── @types/bcrypt@5.0.2  
├── @types/cors@2.8.18  
├── @types/express@5.0.2  
├── @types/jsonwebtoken@9.0.9  
├── @types/node@22.15.29  
├── bcrypt@6.0.0  
├── cors@2.8.5  
├── express@5.1.0  
├── jsonwebtoken@9.0.2  
├── nodemon@3.1.10  
├── sqlite@5.1.1  
├── sqlite3@5.1.7  
├── ts-node@10.9.2  
└── typescript@5.8.3  

    
3. Iniciar el servidor (por defecto lo abre en el puerto 3000)
`npm run dev`

## Tecnologías utilizadas
Este proyecto está desarrollado con:
+ **Node.js (v22.15.0) y Express** (para la API)
+ **SQLite** (base de datos)
+ **bcrypt** (para encriptar contraseñas)
+ **jsonwebtoken** (JWT) (para autenticación)

## Plugins
+ **REST Client** (para hacer pruebas de la API)
+ **SQLite Viewer** (para visualizar la base de datos)


## Estructura Carpetas
Para el proyecto, he intentado seguir el **Modelo Vista Controlador (MVC)**, separando la lógica del modelo de los controladores y las rutas.

```
- db
    - database.sqlite            //base de datos
- node_modules
- scripts
    - seed.ts                    // script para hacer los inserts iniciales
- src
    - controllers                //controladores de la lógica de negocio
        - TodosController.ts
        - UsersController.ts
    - middleware                 // middleware para validaciones y seguridad
        - jwt.ts
    - models                    // modelos que interactúan con la base de datos
        - TodosModel.ts
        - UserModel.ts
    - routes                   // definición de rutas de la API
        - todos.ts
        - users.ts
    - utils
        - gestionarJWT.ts     // funciones para generar y verificar JWT
    
    - db.ts                   // configuración de la conexión a la base de datos
    - index.ts                // archivo principal que inicia la aplicación

    - tests                   // tests con REST Client
    - API_docs.md             // documentación de los endpoints de la API
    - package-lock.json
    - package.json
    - README.md
    - tsconfig.json

```

## Rutas API
Toda la información referente a las rutas de la API se encuentra en este documento: [API docs](API_docs.md)

# Autoría
Irie Yamashita