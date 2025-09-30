# MetaFit CLI

## Descripción del Proyecto
MetaFit es una herramienta **CLI (Command Line Interface)** diseñada para optimizar la **gestión integral de un gimnasio o entrenador personal**.  
Permite administrar clientes, contratos, planes de entrenamiento, nutrición, seguimiento físico y finanzas desde la terminal de manera **ágil, escalable y segura**.  
El proyecto implementa principios de **Programación Orientada a Objetos (POO)**, **SOLID** y patrones de diseño para garantizar un código mantenible y flexible.

---

## Instrucciones de Instalación y Uso
### Requisitos previos
- **Node.js** v18 o superior
- **MongoDB** en ejecución local o en la nube
- **Git** para clonar el repositorio

### Instalación
```bash
# Clonar el repositorio
git clone https://github.com/Andre07g/MetaFit.git

# Ingresar al directorio
cd MetaFit

# Instalar dependencias
npm install
```

### Ejecución
```bash
# Iniciar la aplicación
node src/app.js
```

La herramienta abrirá el menú principal en la terminal para interactuar con las funcionalidades.

---

## Estructura del Proyecto
```
MetaFit/
├─ cli/
│  ├─ menuPrincipal.js           # Punto de entrada para la interacción en terminal
│  └─ commands/                  # Comandos para cada módulo
│     ├─ clientes_command.js
│     ├─ contratos_command.js
│     ├─ gestion_command.js
│     ├─ nutricion_command.js
│     ├─ planes_command.js
│     └─ seguimiento_command.js
├─ models/                        # Modelos de datos
│  ├─ Cliente.js
│  ├─ Contrato.js
│  ├─ Gestion_financiera.js
│  ├─ Nutricion.js
│  ├─ Planes.js
│  └─ Seguimiento.js
├─ repositories/                   # Capa de acceso a datos
│  ├─ clientes_repository.js
│  ├─ contratos_repository.js
│  ├─ gestion_repository.js
│  ├─ nutricion_repository.js
│  └─ planes_repository.js
├─ services/                        # Lógica de negocio
│  ├─ clientes_service.js
│  ├─ contratos_service.js
│  ├─ gestion_service.js
│  ├─ nutricion_service.js
│  ├─ planes_service.js
│  └─ seguimiento_service.js
├─ src/
│  ├─ config/                       # Configuración (DB, variables de entorno)
│  └─ app.js                         # Inicialización de la aplicación
├─ utils/
│  └─ utilidades.js                  # Funciones auxiliares
└─ package.json                       # Dependencias y scripts
```

---

## Principios SOLID aplicados
- **S – Single Responsibility:** Cada módulo (commands, services, repositories) tiene una única responsabilidad clara.
- **O – Open/Closed:** La aplicación admite nuevas funcionalidades sin alterar el código existente, gracias a la modularidad de los servicios.
- **L – Liskov Substitution:** Las clases de modelos pueden ser reemplazadas o extendidas sin afectar la funcionalidad.
- **I – Interface Segregation:** Se separan las operaciones específicas en servicios y repositorios independientes.
- **D – Dependency Inversion:** Los servicios dependen de abstracciones (repositories), no de implementaciones concretas.

---

## Patrones de Diseño Usados
- **Repository Pattern:** Aísla la lógica de acceso a datos, permitiendo cambiar la base de datos sin afectar la lógica de negocio.
- **Command Pattern:** Cada funcionalidad crítica se implementa como un comando independiente, facilitando la ejecución en la CLI.
- **Factory Pattern (implícito):** Creación de instancias de modelos de forma centralizada y flexible.

---

## Consideraciones Técnicas
- Base de datos **MongoDB** para almacenamiento no relacional.
- Uso de **async/await** para operaciones asíncronas y manejo de promesas.
- Persistencia de datos a través de **repositories** para desacoplar la lógica de negocio.
- Implementación de menús interactivos en terminal para una experiencia de usuario fluida.

---

## Créditos
Proyecto desarrollado por:  
- [**Karol Reyes**](https://github.com/KarolainReyes) – Product Owner & Developer  
- [**Andrés Leal**](https://github.com/Andre07g) – Scrum Master & Developer  

---

## Video de Presentación
Aqui podrás encontrar un video con la explicación técnica de los principios y patrones utilizados, mostrando ejemplos concretos en el código del proyecto.
[Enlace al video de presentación del proyecto](https://drive.google.com/file/d/1UX7FapmgLgZn6r_n7nJu-kFUYlWN6YDJ/view?usp=sharing)

## 📝 License

This project is for educational use. It can be used as a reference for modeling NoSQL databases in MongoDB.

Hecho con ❤️ y Node.js
