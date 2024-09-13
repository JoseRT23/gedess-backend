
# Gedess backend

Proyecto desarrollado con la versión 20.15.1 de NodeJS, para el grupo de estudio GEDESS (Grupo de estudio de soluciones de software).

## Instalación

Crear base de datos y sus respectivas tablas con los siguientes comandos SQL.

```bash
CREATE DATABASE `gedess-db`;

CREATE TABLE `gedess-db`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `email` VARCHAR(60) NOT NULL,
  `password` VARCHAR(150) NOT NULL,
  `cellphone` VARCHAR(15),
  PRIMARY KEY (`id`)
);

CREATE TABLE `gedess-db`.`alert` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `value` VARCHAR(45) NOT NULL,
  `date` DATETIME NOT NULL,
  `type` VARCHAR(20) NOT NULL,
  `alert_user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `alert_user_id`
    FOREIGN KEY (`alert_user_id`)
    REFERENCES `gedess-db`.`user` (`id`)
);

CREATE TABLE `gedess-db`.`weather` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `temperature` VARCHAR(30) NOT NULL,
  `date` DATETIME NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `gedess-db`.`parameter` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `min_alert_value` VARCHAR(45) NOT NULL DEFAULT '5',
  `max_alert_value` VARCHAR(45) NOT NULL DEFAULT '20',
  `min_chart_value` VARCHAR(45) NOT NULL DEFAULT '1',
  `max_chart_value` VARCHAR(45) NOT NULL DEFAULT '100',
  `parameter_user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `parameter_user_id`
    FOREIGN KEY (`parameter_user_id`)
    REFERENCES `gedess-db`.`user` (`id`)
);  
```

Instalar gedess-backend com [npm](https://www.npmjs.com/) de la siguiente manera.

```bash
  - Clonar proyecto
    git clone https://github.com/JoseRT23/gedess-backend.git
  
  - Ingresar a la carpeta
    cd gedess-backend

  - Instalar dependencias
    npm install ó npm install --force 
```

## Ejecución

Para ejecutar el proyecto se puede realizar con el siguiente comando.

```bash
    npm run dev
```

Luego de ejecutarlos el proyecto estará corriendo en la siguiente url: http://localhost:3000/api/

## Características

- SocketIO para comunicación en tiempo real.
- Typescript.
- pdfmake para la generación de reportes de tipo pdf.
- exceljs para la generación de reportes de tipo csv.
