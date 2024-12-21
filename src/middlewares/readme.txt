# Middlewares en el Proyecto

La carpeta `middlewares` contiene funciones reutilizables que se ejecutan en el flujo
 de las solicitudes HTTP antes de llegar a los controladores. Estos middlewares son 
 fundamentales para manejar tareas comunes como validación de datos, autorización, 
 manejo de errores y otras acciones necesarias para el correcto funcionamiento del proyecto.

## Función de los Middlewares
- **Modularidad**: Separar la lógica repetitiva de las rutas y controladores.
- **Reusabilidad**: Permitir que la misma funcionalidad se aplique en múltiples rutas.
- **Escalabilidad**: Facilitar la incorporación de nuevas reglas o validaciones a medida que crece el proyecto.

## Archivos de Middlewares

### 1. `validateDoctorKey.js`
**Propósito**:
- Validar que el ID o llave de registro proporcionado por un doctor sea válido antes de completar su registro.

**Uso**:
- Se aplica en la ruta de registro de doctores (`/register/doctor`).

**Ejemplo de implementación**:
- Verifica si la llave existe y coincide con las llaves válidas almacenadas.

---

### 2. `isAuthenticated.js`
**Propósito**:
- Verificar si un usuario está autenticado antes de permitirle acceder a rutas protegidas.

**Uso**:
- Se aplica globalmente a todas las rutas que requieren autenticación.

**Ejemplo de implementación**:
- Verifica la presencia de un token válido en la cabecera de autorización.

---

### 3. `hasRole.js`
**Propósito**:
- Verificar que el usuario tenga el rol adecuado para acceder a ciertas funcionalidades (doctor, paciente o asistente).

**Uso**:
- Se aplica en rutas específicas donde se requiere autorización basada en roles.

**Ejemplo de implementación**:
- Verifica el rol del usuario en el objeto `req.user` después de la autenticación.

---

### 4. `errorHandler.js`
**Propósito**:
- Capturar y manejar errores que ocurren en el flujo de las solicitudes para devolver respuestas consistentes.

**Uso**:
- Middleware global que se coloca al final de todas las rutas.

**Ejemplo de implementación**:
- Devuelve un código de estado HTTP y un mensaje descriptivo del error.

---

### 5. `validateInputs.js`
**Propósito**:
- Validar los datos de entrada enviados en las solicitudes (e.g., correos electrónicos, contraseñas, etc.).

**Uso**:
- Se aplica en rutas donde se necesita asegurar la integridad de los datos antes de continuar con la lógica del controlador.

**Ejemplo de implementación**:
- Usa bibliotecas como `express-validator` o `Joi` para validar y sanitizar los datos.

---

### 6. `rateLimiter.js`
**Propósito**:
- Limitar la cantidad de solicitudes que un cliente puede realizar en un periodo de tiempo específico.

**Uso**:
- Se aplica en rutas sensibles para evitar abusos o ataques de fuerza bruta.

**Ejemplo de implementación**:
- Configura límites por IP utilizando bibliotecas como `express-rate-limit`.

---

## ¿Qué Middlewares Deben Contener?
Dependiendo de la funcionalidad de las rutas, se deben usar diferentes combinaciones de middlewares:

### Rutas de Autenticación (e.g., `/login`, `/register`)
- `validateInputs.js`: Validar datos como correos y contraseñas.
- `validateDoctorKey.js`: Solo en el registro de doctores.

### Rutas Protegidas (e.g., `/dashboard`, `/patients`)
- `isAuthenticated.js`: Verificar autenticación.
- `hasRole.js`: Validar permisos específicos.

### Global (en todas las rutas)
- `errorHandler.js`: Capturar y manejar errores.
- `rateLimiter.js`: Limitar solicitudes repetitivas.

## Ejemplo de Uso
En el archivo de rutas (`routes/auth.js`):
```javascript
const express = require("express");
const validateDoctorKey = require("../middlewares/validateDoctorKey");
const validateInputs = require("../middlewares/validateInputs");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/register/doctor", validateDoctorKey, validateInputs, authController.registerDoctor);

module.exports = router;
```
