import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import dotenv from 'dotenv';
dotenv.config();

import { Express } from "express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Documentación API SOA",
      version: "1.0.0",
      description: "API para gestión de eventos y ubicaciones",
    },
    components: {
      schemas: {
        Event: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            name: { type: "string", example: "Concierto de Rock" },
            description: { type: "string", example: "Un evento musical con bandas en vivo" },
            start_date: { type: "string", format: "date-time", example: "2025-07-01T18:00:00Z" },
            end_date: { type: "string", format: "date-time", example: "2025-07-01T21:00:00Z" },
            sale_start: { type: "string", format: "date-time", example: "2025-06-01T00:00:00Z" },
            sale_end: { type: "string", format: "date-time", example: "2025-06-30T23:59:59Z" },
            is_active: { type: "boolean", example: true },
            deleted: { type: "boolean", example: false },
            created_at: { type: "string", format: "date-time", example: "2025-01-01T00:00:00Z" },
            updated_at: { type: "string", format: "date-time", example: "2025-01-01T00:00:00Z" },
          },
        },
        Location: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            name: { type: "string", example: "Estadio Nacional" },
            capacity: { type: "integer", example: 50000 },
            is_active: { type: "boolean", example: true },
            deleted: { type: "boolean", example: false },
            created_at: { type: "string", format: "date-time", example: "2025-01-01T00:00:00Z" },
            updated_at: { type: "string", format: "date-time", example: "2025-01-01T00:00:00Z" },
          },
        },
        EventLocation: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            event_id: { type: "integer", example: 1 },
            location_id: { type: "integer", example: 2 },
            name: { type: "string", example: "Zona VIP" },
            price: { type: "number", example: 150.0 },
            is_active: { type: "boolean", example: true },
            deleted: { type: "boolean", example: false },
            created_at: { type: "string", format: "date-time", example: "2025-01-01T00:00:00Z" },
            updated_at: { type: "string", format: "date-time", example: "2025-01-01T00:00:00Z" },
          },
        },
        CreateEventDto: {
          type: "object",
          required: ["name", "description", "start_date", "end_date", "sale_start", "sale_end"],
          properties: {
            name: { type: "string", example: "Concierto de Rock" },
            description: { type: "string", example: "Un evento musical con bandas en vivo" },
            start_date: { type: "string", format: "date-time", example: "2025-07-01T18:00:00Z" },
            end_date: { type: "string", format: "date-time", example: "2025-07-01T21:00:00Z" },
            sale_start: { type: "string", format: "date-time", example: "2025-06-01T00:00:00Z" },
            sale_end: { type: "string", format: "date-time", example: "2025-06-30T23:59:59Z" },
          },
        },
        UpdateEventDto: {
          type: "object",
          required: ["event_id"],
          properties: {
            event_id: { type: "integer", example: 1 },
            name: { type: "string", example: "Nuevo nombre del evento" },
            description: { type: "string", example: "Descripción actualizada" },
            start_date: { type: "string", format: "date-time", example: "2025-07-01T18:00:00Z" },
            end_date: { type: "string", format: "date-time", example: "2025-07-01T21:00:00Z" },
            sale_start: { type: "string", format: "date-time", example: "2025-06-01T00:00:00Z" },
            sale_end: { type: "string", format: "date-time", example: "2025-06-30T23:59:59Z" },
            is_active: { type: "boolean", example: true },
            deleted: { type: "boolean", example: false },
          },
        },
        CreateEventLocationDto: {
          type: "object",
          required: ["event_id", "location_id", "name", "price"],
          properties: {
            event_id: { type: "integer", example: 1 },
            location_id: { type: "integer", example: 2 },
            name: { type: "string", example: "Zona VIP" },
            price: { type: "number", example: 150.0 },
          },
        },
        UpdateEventLocationDto: {
          type: "object",
          required: ["event_location_id"],
          properties: {
            event_location_id: { type: "integer", example: 1 },
            event_id: { type: "integer", example: 1 },
            location_id: { type: "integer", example: 2 },
            name: { type: "string", example: "Zona General" },
            price: { type: "number", example: 80.0 },
            is_active: { type: "boolean", example: true },
            deleted: { type: "boolean", example: false },
          },
        },
        CreateLocationDto: {
          type: "object",
          required: ["name", "capacity"],
          properties: {
            name: { type: "string", example: "Estadio Nacional" },
            capacity: { type: "integer", example: 50000 },
          },
        },
        UpdateLocationDto: {
          type: "object",
          required: ["id"],
          properties: {
            id: { type: "integer", example: 1 },
            name: { type: "string", example: "Estadio Nacional" },
            capacity: { type: "integer", example: 60000 },
            is_active: { type: "boolean", example: true },
            deleted: { type: "boolean", example: false },
          },
        },
      },
    },
    servers: [
      {
         url: process.env.SWAGGER_SERVER_URL || 'http://localhost:2221/api',
      },
    ],
  },
  apis: ["src/routes/*.ts"], // debe apuntar a donde están tus rutas
};

const specs = swaggerJsdoc(options);

export function setupSwagger(app: Express) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
}
