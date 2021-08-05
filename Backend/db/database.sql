CREATE DATABASE ticketOne
USE ticketOne

CREATE TABLE Usuarios(
  id INT NOT NULL IDENTITY(1,1),
  nombre VARCHAR(50) NOT NULL,
  pass VARCHAR(20) NOT NULL,
  estado VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  PRIMARY KEY(id)
)

CREATE TABLE Presupuestos(
  id INT NOT NULL IDENTITY(1,1),
  idUsuario INT NOT NULL,
  fechaCreacion DATE NOT NULL,
  proyecto VARCHAR(max) NOT NULL,
  version VARCHAR(10) NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(idUsuario) REFERENCES Usuarios
)

CREATE TABLE Meses(
  id INT NOT NULL IDENTITY(1,1),
  idPresupuesto INT NOT NULL,
  inicial BIT NOT NULL,  
  nombre VARCHAR(20) NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(idPresupuesto) REFERENCES Presupuestos
)

CREATE TABLE Ingresos(
  id INT NOT NULL IDENTITY(1,1),
  idMes INT NOT NULL,
  concepto VARCHAR(50) NOT NULL,
  cantidad FLOAT NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(idMes) REFERENCES Meses
)

CREATE TABLE Costos(
  id INT NOT NULL IDENTITY(1,1),
  idMes INT NOT NULL,
  concepto VARCHAR(50) NOT NULL,
  opcion INT NOT NULL,
  cantidad FLOAT,
  opcionDos VARCHAR(max),
  opcionTres VARCHAR(max),
  PRIMARY KEY(id),
  FOREIGN KEY(idMes) REFERENCES Meses
)

CREATE TABLE Gastos(
  id INT NOT NULL IDENTITY(1,1),
  idMes INT NOT NULL,
  concepto VARCHAR(50) NOT NULL,
  opcion INT NOT NULL,
  cantidad FLOAT,
  opcionDos VARCHAR(max),
  opcionTres VARCHAR(max),
  PRIMARY KEY(id),
  FOREIGN KEY(idMes) REFERENCES Meses
)

CREATE TABLE Recursos(
  id INT NOT NULL IDENTITY(1,1),
  idMes INT NOT NULL,
  rol VARCHAR(50) NOT NULL,
  porcentaje FLOAT NOT NULL,
  costo FLOAT NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(idMes) REFERENCES Meses
)