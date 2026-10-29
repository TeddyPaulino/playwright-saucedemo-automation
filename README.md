# Proyecto de Automatización de Pruebas con Playwright

![Playwright](https://img.shields.io/badge/Playwright-Automatización-2EAD33?logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-Pruebas-3178C6?logo=typescript&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-Integración%20Continua-2088FF?logo=githubactions&logoColor=white)

## Descripción del proyecto

Este proyecto implementa una solución de automatización de pruebas utilizando **Playwright y TypeScript**.

Su objetivo es validar los principales flujos de compra de la aplicación web SauceDemo y ejecutar pruebas de API mediante JSONPlaceholder.

El proyecto aplica buenas prácticas de automatización, incluyendo Page Object Model (POM), fixtures reutilizables, validaciones, generación de reportes con Allure y ejecución automática mediante GitHub Actions.

**Repositorio:** https://github.com/TeddyPaulino/playwright-saucedemo-automation

## Tecnologías utilizadas

- **Playwright Test:** automatización de navegadores y pruebas de API.
- **TypeScript:** desarrollo de los scripts de prueba.
- **Node.js y npm:** ejecución del proyecto y administración de dependencias.
- **Page Object Model (POM):** separación de los localizadores y las acciones de cada página respecto a los casos de prueba.
- **Fixtures:** reutilización de configuraciones y objetos necesarios para las pruebas.
- **Allure Reports:** generación de reportes de ejecución.
- **Git y GitHub:** control de versiones y alojamiento del código.
- **GitHub Actions:** ejecución automatizada de pruebas en integración continua.

## Alcance de las pruebas

### 1. Pruebas de interfaz de usuario (UI)

Se automatizan los principales flujos de compra de SauceDemo:

- Inicio de sesión y validación de credenciales.
- Consulta del catálogo de productos.
- Agregar y eliminar productos del carrito.
- Validación del contenido del carrito.
- Ejecución del proceso de checkout.
- Validación de campos obligatorios.
- Verificación de títulos, mensajes, elementos y navegación.

### 2. Pruebas de API

Se implementaron seis escenarios de prueba utilizando JSONPlaceholder.

| ID      | Caso de prueba                    | Resultado esperado                             |
| ------- | --------------------------------- | ---------------------------------------------- |
| API-001 | Consultar un usuario por ID       | HTTP 200 y validación de los datos             |
| API-002 | Consultar la lista de usuarios    | HTTP 200 y respuesta con una lista de usuarios |
| API-003 | Consultar un endpoint inexistente | HTTP 404                                       |
| API-004 | Crear un usuario                  | HTTP 201 y validación de la respuesta          |
| API-005 | Actualizar un usuario             | HTTP 200 y validación de los datos             |
| API-006 | Eliminar un usuario               | HTTP 200                                       |

**Nota:** JSONPlaceholder es un servicio de pruebas que simula operaciones de escritura. Las operaciones de creación, actualización y eliminación no modifican permanentemente los datos del servicio.

## Estructura del proyecto

```text
saucedemo/
├── .github/
│   └── workflows/
│       └── playwright.yml
├── fixtures/
│   └── test.fixture.ts
├── page/
│   ├── LoginPage.ts
│   ├── HomePage.ts
│   ├── ProductPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
├── tests/
│   ├── api/
│   │   └── users.spec.ts
│   ├── login.spec.ts
│   └── productos/
├── utilities/
│   └── authentication.ts
├── playwright.config.ts
├── package.json
├── package-lock.json
└── README.md
```

_Esta estructura muestra los principales componentes del proyecto. Los nombres de los archivos deben ajustarse a la estructura real del repositorio._

## Instalación y configuración

### Requisitos previos

- Node.js instalado.
- npm instalado.
- Git instalado.
- Visual Studio Code o un editor de código equivalente.

### Paso 1. Descargar el proyecto

```bash
git clone https://github.com/TeddyPaulino/playwright-saucedemo-automation.git
cd playwright-saucedemo-automation
```

### Paso 2. Instalar las dependencias

```bash
npm ci
```

### Paso 3. Instalar Chromium para Playwright

```bash
npx playwright install chromium
```

## Ejecución de las pruebas

### Ejecutar todas las pruebas

```bash
npx playwright test
```

### Ejecutar las pruebas en modo visible

```bash
npm test
```

### Ejecutar únicamente las pruebas de API

```bash
npx playwright test tests/api/users.spec.ts
```

### Ejecutar un archivo específico

```bash
npx playwright test ruta/al/archivo.spec.ts
```

Sustituye la ruta de ejemplo por la ubicación real del archivo de prueba.

### Ejecutar las pruebas en modo CI

```bash
npm run test:ci
```

## Generación de reportes con Allure

El proyecto integra Allure para facilitar la revisión de las ejecuciones y el análisis de los fallos.

### Generar el reporte

```bash
npm run report:allure
```

### Abrir el reporte

```bash
npm run report:open
```

El reporte permite consultar los resultados de las pruebas y revisar las evidencias disponibles de las ejecuciones.

## Integración continua con GitHub Actions

El proyecto cuenta con un workflow de GitHub Actions que ejecuta las pruebas cuando se realizan cambios en la rama `main`, cuando se crean solicitudes de integración dirigidas a esa rama o cuando se inicia el workflow manualmente.

Archivo de configuración:

```text
.github/workflows/playwright.yml
```

El proceso automatizado contempla:

1. Descargar el código del repositorio.
2. Configurar Node.js.
3. Instalar las dependencias.
4. Instalar Chromium y sus dependencias.
5. Ejecutar las pruebas automatizadas.
6. Publicar los resultados disponibles como artefactos de la ejecución.

**Historial de ejecuciones:** https://github.com/TeddyPaulino/playwright-saucedemo-automation/actions

## Resultados de validación

Durante el desarrollo del proyecto se verificaron los siguientes resultados:

- **Ejecución local:** 19 pruebas aprobadas y 0 fallidas.
- **GitHub Actions:** la ejecución asociada al commit `343a9e2` finalizó correctamente.
- **Control de versiones:** los cambios de las pruebas API fueron guardados y sincronizados con la rama remota `main`.

El total de pruebas ejecutadas en GitHub Actions debe confirmarse en el detalle de cada ejecución, ya que puede variar respecto al resultado local.

## Buenas prácticas aplicadas

- Organización de las pruebas mediante Page Object Model.
- Reutilización de objetos y configuraciones mediante fixtures.
- Validación de escenarios positivos y negativos.
- Verificación de códigos HTTP y contenido de las respuestas API.
- Uso de aserciones de Playwright Test.
- Generación de reportes y evidencias de fallos.
- Control de versiones con Git.
- Integración continua con GitHub Actions.

## Mejoras futuras

- Ampliar la cobertura de las pruebas API.
- Incorporar utilidades reutilizables para las solicitudes API.
- Mejorar la administración de datos de prueba.
- Incorporar configuración para diferentes ambientes.
- Fortalecer la publicación y revisión de reportes Allure en CI.
- Documentar con mayor detalle la arquitectura y la solución de problemas frecuentes.

## Autor

**Teddy Paulino**

Proyecto de práctica profesional orientado al desarrollo de competencias en QA Automation, automatización de pruebas UI y API, arquitectura de pruebas, generación de reportes e integración continua.
