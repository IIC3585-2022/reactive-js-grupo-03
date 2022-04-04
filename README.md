[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-f059dc9a6f8d3a56e377f745f24479a46679e63a5d9fe6f495e02850cd0d8118.svg)](https://classroom.github.com/online_ide?assignment_repo_id=7454953&assignment_repo_type=AssignmentRepo)
# Tarea 2 - Grupo 03

# Tabla de contenidos
0. [Ejecucion](#ejecucion)
1. [Composición](#composicion)
2. [Dependencias](#dependencias)

# 0. Ejecucion<a id="ejecucion"></a>

Primero instalar las dependencias:

```sh
npm install
```

Luego, debera construir el ambiente:

```sh
npm run build
```

Por ultimo, se puede correr la app usando el siguiente comando:

```sh
$ npm start
```

Encontrará una interfaz de usuario que le permitirá interactuar con el sistema, ingresando a su browser de preferencia y dirigiendose a la dirección que levante el sistema.


# 1. Composición<a id="composicion"></a>

Para las tareas, es relevante tener la siguiente organización de archivos:

```
.
│   index.js
|   index.html
│   README.md
|   package.json
|   package-lock.json
│   .gitignore
│
└───src
|   |   app.js
|   |
│   └───assets
|   |   |  
│   |   └───js
|   |       |   window.js
|   |   |
│   |   └───styles
|   |       |   index.css
|   |
│   └───setup
|   |   |   map.js
|   |
│   └───views
```

A continuación se describen las funcionalidades de cada archivo y carpeta:
- `src`: Carpeta donde se almacenan los datos y se mantiene el codigo funcional:
    - `app.js`: ...
    - `data`: ...


# 2. Dependencias<a id="dependencias"></a>

En el siguiente listado mostramos las dependencias que se requieren para correr la aplicación:

 * [npm](https://www.npmjs.com/)
 * [jquery](https://jquery.com/)
 * [parcel](https://parceljs.org/)
