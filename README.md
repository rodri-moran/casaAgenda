# CasaAgenda

## Descripción general del proyecto

CasaAgenda es una aplicación web full stack para la gestión interna de reservas de alojamientos temporarios.  
Está pensada para propietarios que administran sus propios departamentos o propiedades y necesitan una herramienta organizada para registrar reservas, controlar disponibilidad y gestionar los aspectos económicos asociados.

No es un marketplace público (no funciona como Airbnb), sino una plataforma de uso interno para administración privada.

---

## Objetivo

El objetivo principal de CasaAgenda es reemplazar la gestión manual de reservas (planillas, anotaciones en cuadernos, mensajes de WhatsApp) por un sistema centralizado, visual y consistente, que:

- Reduzca errores humanos.
- Evite conflictos de fechas.
- Automatice cálculos económicos.
- Mejore la trazabilidad del historial de reservas.

---

## Qué problema resuelve

En contextos familiares o de pequeña escala, la administración de reservas suele hacerse de forma dispersa, lo que genera problemas como:

- Doble reserva del mismo departamento en las mismas fechas.
- Pérdida de información sobre señas, montos restantes o descuentos.
- Historial incompleto o inexistente de reservas pasadas.
- Dificultad para ver rápidamente disponibilidad y estado actual de cada propiedad.

CasaAgenda centraliza toda la información en una única plataforma, permitiendo:

- Controlar disponibilidad por fechas.
- Mantener el historial completo de reservas.
- Tener claridad sobre los importes totales, señas y montos pendientes.
- Contar con una vista clara de cada departamento y sus reservas asociadas.

---

## Funcionalidades principales

### Gestión de departamentos

- Crear y administrar departamentos/propiedades.
- Visualizar un listado de propiedades disponibles.
- Acceder al detalle de cada departamento y sus reservas asociadas.

### Gestión de reservas

- Crear nuevas reservas asociadas a un departamento.
- Editar reservas existentes.
- Cancelar reservas sin eliminar el historial.
- Visualizar detalle de cada reserva:
  - Datos del huésped.
  - Fechas de ingreso y salida.
  - Precio, seña, restante.
  - Notas internas.

### Manejo de estados de reserva

Cada reserva puede tener uno de los siguientes estados:

- `PENDING`
- `ACTIVE`
- `COMPLETE`
- `CANCELLED`

Esto permite entender rápidamente en qué etapa se encuentra cada reserva.

### Disponibilidad y validaciones

- Búsqueda de disponibilidad filtrando por fechas de ingreso y salida.
- Validación automática para evitar reservas superpuestas en el mismo departamento.
- Reglas de negocio para mantener la integridad de las reservas y sus estados.

### Cálculos automáticos

- Cálculo del **total** de la reserva.
- Cálculo de **seña**.
- Cálculo del **restante** a abonar.
- Precio configurable:
  - Por noche.
  - Por persona (según el modelo de negocio configurado).

### Exportación de comprobantes

- Generación y exportación de comprobantes de reserva en:
  - PDF.
  - Imagen.
  
Orientado a enviar al huésped o guardar para registro interno.

### Experiencia de uso

- Formularios reactivos con validaciones en frontend.
- Navegación sencilla entre departamentos y reservas.
- Interfaz pensada para uso frecuente por parte del propietario/administrador.

---

## Arquitectura

CasaAgenda sigue una arquitectura típica de aplicación web full stack, separando claramente las responsabilidades entre backend y frontend.

### Backend

- Exposición de una **API REST**.
- Patrón de capas:

  - **Controller**
    - Expone endpoints REST.
    - Recibe y devuelve DTOs.
    - Orquesta las operaciones de alto nivel.
  
  - **Service**
    - Contiene la lógica de negocio.
    - Aplica validaciones de reglas (por ejemplo, evitar solapamiento de reservas).
    - Maneja estados de reserva y cálculos asociados.

  - **Repository**
    - Acceso a datos mediante Spring Data JPA.
    - Operaciones sobre entidades persistidas en PostgreSQL.

  - **DTOs**
    - Separación de modelos para distintas operaciones:
      - DTOs de creación (Create).
      - DTOs de actualización (Update).
      - DTOs de respuesta (Response).
    - Evitan exponer directamente las entidades de dominio.

- Validaciones de negocio implementadas en la capa Service.

### Frontend

- Aplicación desarrollada con **Angular** utilizando **standalone components**.
- Estructura por **features**, agrupando componentes, servicios y recursos por funcionalidad.
- Uso de **Signals** para manejo de estado en el frontend.
- Formularios implementados con **Reactive Forms**:
  - Validaciones de campos.
  - Manejo consistente de errores de usuario.
- Navegación entre vistas:
  - Listado de departamentos.
  - Detalle de departamento.
  - Creación/edición de reserva.
  - Detalle de reserva.

---

## Tecnologías utilizadas

### Backend

- Java
- Spring Boot
- Spring Data JPA
- Hibernate
- Jakarta Validation
- PostgreSQL

### Frontend

- Angular
- Angular Signals
- RxJS
- Bootstrap 5
- HTML
- CSS
- TypeScript

### Herramientas de desarrollo

- Git
- GitHub
- Postman (pruebas de API)

---

## Ejecución local paso a paso

> Nota: El proyecto no utiliza Docker. La ejecución se realiza de forma clásica, levantando backend y frontend por separado.

### 1. Requisitos previos

Asegurarse de tener instalado:

- Java 17 o superior.
- Maven.
- Node.js v18 o superior.
- Angular CLI.



### 2. Clonar el repositorio

```bash
git clone https://github.com/rodri-moran/casaAgenda
cd CasaAgenda
```
### 3. Configuración y ejecución del backend

Ingresar a la carpeta del backend:
```bash
cd backend
```

Compilar y ejecutar la API:
```bash
mvn clean install
mvn spring-boot:run
```
El backend va a quedar expuesto en:
```bash
http://localhost:8080
```
### 4. Configuración y ejecución del frontend

En una nueva terminal, regresar a la raíz del proyecto y después ingresar a la carpeta del frontend:
```bash
cd CasaAgenda
cd frontend
```
Instalar dependencias:
```bash
npm install
```
Ejecutar la aplicación Angular:
```bash
ng serve -o
```
El frontend se va a abrir en el navegador en:
```bash
http://localhost:4200
```
La aplicación se va a comunicar con la API expuesta en http://localhost:8080 para realizar todas las operaciones de gestión de departamentos y reservas.

---

### Mejoras futuras

Algunas posibles líneas de evolución del proyecto incluyen:

Sistema de autenticación y roles:

- Administrador.

- Usuarios con distintos niveles de acceso.


Panel de reportes:

- Ocupación por período.

- Ingresos estimados y reales.

- Historial consolidado por departamento.

- Integración de calendario visual más avanzado (por ejemplo, vista tipo calendario mensual).

- Envío automático de comprobantes por correo electrónico.

Configuración avanzada de políticas de precios:

- Temporadas altas y bajas.

- Descuentos por estadía prolongada.

- Internacionalización (multi-idioma).

- Pruebas automatizadas (unitarias e integración) tanto en backend como en frontend.

Notificaciones:
- Cuando se está por ir un huésped.
- Cuando está por ingresar un huésped.

## Autor

Rodrigo Nicolás Moran | Desarrollador Full Stack

Email: rodrigomoran143@gmail.com

LinkedIn: www.linkedin.com/in/rodrigo-moran99

GitHub: https://github.com/rodri-moran

Portfolio: https://rodrigo-moran-portfolio.vercel.app/
