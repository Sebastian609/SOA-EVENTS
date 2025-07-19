import { DataSource } from "typeorm";
import { config } from 'dotenv';
import { Event } from "../entity/events.entity";
import { Location } from "../entity/locations.entity";
import { EventLocation } from "../entity/event_locations.entity";

config(); // Cargar variables del archivo .env

export const AppDataSource = new DataSource({
  type: "mysql",
  driver: require('mysql2'),
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: true,
  entities: [Event,Location,EventLocation],
  migrations: [],
  subscribers: [],
});

// Inicializar la conexión
AppDataSource.initialize()
  .then(() => console.log("Conexión a la base de datos establecida"))
  .catch((error) => console.log("Error de conexión:", error));