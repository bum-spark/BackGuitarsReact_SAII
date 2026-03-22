# Guitarras API — Backend (Node.js/Express)

API REST desarrollada con **Node.js + Express + TypeScript + Sequelize + PostgreSQL** que sirve como servidor para la aplicación frontend de Guitarras en React.

---

## Tecnologías utilizadas

| Tecnología | Versión | Uso |
|---|---|---|
| Node.js | v22+ | Entorno de ejecución |
| TypeScript | ^5.9 | Tipado estático |
| Express | ^5.2 | Framework HTTP |
| Sequelize + sequelize-typescript | ^6.37 / ^2.1 | ORM para PostgreSQL |
| PostgreSQL | — | Base de datos (Render) |
| express-validator | ^7.3 | Validación de datos |
| cors | ^2.8 | Control de acceso entre dominios |
| dotenv | ^17.3 | Variables de entorno |
| nodemon + ts-node | — | Servidor de desarrollo |

---

## Requisitos previos

- **Node.js** v18 o superior ([descargar](https://nodejs.org))
- **npm** v9 o superior (viene incluido con Node.js)
- Una base de datos **PostgreSQL** disponible (en este caso usamos [Render](https://render.com))

---

## Instalación y configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/bum-spark/BackGuitarsReact_SAII.git
cd BackGuitarsReact_SAII
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar las variables de entorno

Copia el archivo de ejemplo y rellena tus propias credenciales:

```bash
# En Windows (PowerShell)
Copy-Item .env.example .env

# En Mac/Linux
cp .env.example .env
```

Luego abre el archivo `.env` y reemplaza la dirección por tus credenciales dadas por Render, en este caso estan las que yo utilicé.

| Variable | Descripción | Ejemplo |
|---|---|---|
| `DB_URL` | URL de conexión completa a PostgreSQL | `postgresql://user:pass@host/db?ssl=true` |

### 4. Poblar la base de datos (Seed)

Ejecuta el script de semilla para crear la tabla `guitars` e insertar los 12 registros iniciales:

```bash
npx ts-node src/seed.ts
```

Deberías ver en consola:
```
Tabla sincronizada (recreada).
Guitarras insertadas correctamente.
```

> IMPORTANTE: Este comando solo necesita ejecutarse **una vez**. Si ya existe la tabla con datos, no es necesario volver a correrlo (o puedes correrlo nuevamente para poblar la tabla con datos iniciales de nuevo).

### 5. Arrancar el servidor

```bash
npm run dev
```

El servidor queda disponible en: **`http://localhost:4000`**

Deberías ver:
```
[nodemon] starting `ts-node src/index.ts`
REST Api en puerto 4000
Conexion Exitosa
```

---

## Endpoints de la API

Base URL: `http://localhost:4000/Api`

| Método | Ruta | Descripción | Body requerido |
|--------|------|-------------|----------------|
| `GET` | `/Api` | Obtener todas las guitarras activas | — |
| `GET` | `/Api/:id` | Obtener una guitarra por ID | — |
| `POST` | `/Api` | Crear una nueva guitarra | `{ name, price, image?, description? }` |
| `PUT` | `/Api/:id` | Actualizar una guitarra completa | `{ name, price, availability, image?, description? }` |
| `PATCH` | `/Api/:id` | Alternar disponibilidad (soft delete de disponibilidad) | — |
| `DELETE` | `/Api/:id` | Soft delete (marca `deleted=true`, no borra de la BD) | — |

> **Documentación detallada de endpoints** (métodos HTTP, body exacto, respuestas exitosas y de error en formato APA 7):  
> [Ver documento completo en Google Docs](https://docs.google.com/document/d/1oBmjnFXv3jjXVj0aerIeONTpWecFfZQ_ukb74NW5VfM/edit?usp=sharing)


### Estructura de respuesta

Todas las respuestas exitosas siguen el formato:

```json
{
  "data": { ... }
}
```

### Ejemplo — GET `/Api`

```json
{
  "data": [
    {
      "id": 1,
      "name": "Lukather",
      "image": "guitarra_01",
      "description": "Descripción de la guitarra...",
      "price": 299,
      "availability": true,
      "deleted": false
    }
  ]
}
```

### Ejemplo — POST `/Api`

**Body (JSON):**
```json
{
  "name": "Lukather",
  "price": 299,
  "image": "guitarra_01",
  "description": "Descripción de la guitarra..."
}
```

### Validaciones

| Campo | Regla |
|---|---|
| `name` | No puede estar vacío |
| `price` | Debe ser numérico y mayor a 0 |
| `availability` | Debe ser booleano (solo en PUT) |

Si la validación falla, la API responde con `400 Bad Request`:
```json
{
  "errors": [
    { "msg": "El nombre de la guitarra no puede ir vacío", "path": "name" }
  ]
}
```

---

## Estructura de la base de datos

### Tabla `guitars`

| Columna | Tipo | Descripción |
|---|---|---|
| `id` | INTEGER (PK, auto) | Identificador único |
| `name` | VARCHAR(100) | Nombre de la guitarra |
| `image` | VARCHAR(100) | Nombre del archivo de imagen |
| `description` | TEXT | Descripción del producto |
| `price` | FLOAT | Precio |
| `availability` | BOOLEAN (default: `true`) | Si la guitarra está disponible |
| `deleted` | BOOLEAN (default: `false`) | Soft delete  |
| `createdAt` | TIMESTAMP | Fecha de creación (Sequelize automático) |
| `updatedAt` | TIMESTAMP | Fecha de última actualización (Sequelize automático) |

---

## Integración con el Frontend

Este backend está diseñado para trabajar con el frontend [GuitarrasReact](https://github.com/bum-spark/SA-PruebaReact).

### CORS configurado

El servidor permite peticiones desde `http://localhost:5173` (puerto por defecto de Vite). Si tu frontend corre en otro puerto, actualiza la configuración en `src/server.ts`:

```typescript
server.use(cors({
    origin: 'http://localhost:5173'  // ← cambia este valor si es necesario
}))
```

### Pasos para levantar ambos servidores

**Terminal 1 — Backend:**
```bash
cd Pern-Back
npm run dev
```

**Terminal 2 — Frontend:**
```bash
cd SA-PruebaReact
npm run dev
```

Luego abre **`http://localhost:5173`** en el navegador.

---

## Estructura del proyecto

```
Pern-Back/
├── src/
│   ├── config/
│   │   └── db.ts           # Conexión a PostgreSQL con Sequelize
│   ├── handlers/
│   │   └── guitar.ts       # Controladores CRUD de guitarras
│   ├── middleware/
│   │   └── index.ts        # Middleware de validación de errores
│   ├── models/
│   │   └── Guitar.model.ts # Modelo Sequelize de guitarra
│   ├── index.ts            # Punto de entrada — inicia el servidor
│   ├── router.ts           # Definición de rutas y validadores
│   ├── seed.ts             # Script para poblar la BD con datos iniciales
│   └── server.ts           # Configuración de Express (CORS, middlewares)
├── .env                    # Variables de entorno (NO subir a GitHub)
├── .env.example            # Plantilla de variables de entorno
├── .gitignore
├── package.json
└── tsconfig.json
```
