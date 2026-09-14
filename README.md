# Northwind API

API REST construida con Node.js, Express y PostgreSQL sobre la base de datos Northwind. Expone clientes, productos y pedidos.

## Requisitos

- Node.js 18 o superior
- PostgreSQL con la base de datos Northwind cargada

## Instalacion

1. Clonar el repositorio

```bash
git clone https://github.com/jhennyquispettc-ux/northwind_api.git
cd northwind_api
```

2. Instalar dependencias

```bash
npm install
```

3. Copiar el archivo de ejemplo de variables de entorno

```bash
cp .env.example .env
```

4. Editar el archivo `.env` con los datos de la base de datos

```
DB_USER=postgres
DB_HOST=localhost
DB_NAME=northwind
DB_PASSWORD=admin
DB_PORT=5432
PORT=3000
```

5. Levantar el servidor

```bash
npm run dev
```

En modo produccion se usa `npm start`. El servidor queda escuchando en `http://localhost:3000`.

## Endpoints

Todas las rutas usan el prefijo `/api`.

| Metodo | Ruta | Descripcion |
| --- | --- | --- |
| GET | `/api/customers` | Lista todos los clientes |
| GET | `/api/products` | Lista todos los productos |
| GET | `/api/orders` | Lista todos los pedidos |
| GET | `/api/orders/:id` | Devuelve un pedido con su detalle |
| POST | `/api/orders` | Crea un pedido con sus detalles |

### Crear un pedido

Cuerpo de la peticion

```json
{
  "customerId": "VINET",
  "employeeId": 5,
  "orderDate": "2025-11-04",
  "requiredDate": "2025-12-02",
  "shippedDate": "2025-11-10",
  "shipVia": 3,
  "freight": 32.38,
  "shipName": "Vins et alcools Chevalier",
  "shipAddress": "59 rue de l Abbaye",
  "shipCity": "Reims",
  "shipRegion": "CJ",
  "shipPostalCode": "51100",
  "shipCountry": "France",
  "orderDetails": [
    {
      "productId": 11,
      "quantity": 12,
      "unitPrice": 14,
      "discount": 0
    }
  ]
}
```

Respuesta

```json
{
  "id": 11078
}
```

El pedido y sus detalles se guardan dentro de una transaccion. Si un producto o el cliente no existen se hace rollback y no se inserta nada.

## Codigos de respuesta

| Codigo | Cuando ocurre |
| --- | --- |
| 200 | Consulta exitosa |
| 201 | Pedido creado |
| 400 | Faltan campos obligatorios en el cuerpo |
| 404 | El pedido, cliente o producto no existe |
| 500 | Error de base de datos o error inesperado |

## Pruebas con Postman

En la raiz del proyecto esta el archivo `northwind_api.postman_collection.json`. Para usarlo abre Postman, entra a Import y selecciona el archivo.

La coleccion trae estas variables:

- `baseUrl` con valor `http://localhost:3000`
- `orderId` con valor `10248`
- `customerId` con valor `VINET`
- `createdOrderId` que se llena sola al crear un pedido

Incluye pruebas de casos correctos y tambien de casos con error, como pedir un pedido que no existe o enviar un cuerpo incompleto. Se puede ejecutar todo de una vez con el Collection Runner.

## Estructura del proyecto

```
config/        conexion al pool de PostgreSQL
routes/        definicion de rutas de Express
controllers/   manejo de peticion y respuesta
services/      logica de negocio y transacciones
models/        acceso a datos y consultas SQL
dto/           objetos de transferencia
validators/    reglas de validacion con express-validator
middlewares/   manejo de errores y validacion
```

## Autor

Jhenny Quispe