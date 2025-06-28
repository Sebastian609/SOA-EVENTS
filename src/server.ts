import express from "express";
import cors from "cors";
import { createServer } from "http";
import { AppDataSource } from "./infrastructure/database/database";
import { setupSwagger } from "./config/swagger";

import { Event } from './infrastructure/entity/events.entity';
import { Location } from './infrastructure/entity/locations.entity';
import { EventLocation } from './infrastructure/entity/event_locations.entity';

import { EventRepository } from './repository/events.repository';
import { LocationRepository } from './repository/locations.repository';
import { EventLocationRepository } from './repository/event_locations.repository';

import { EventService } from './service/events.service';
import { LocationService } from './service/locations.service';
import { EventLocationService } from './service/event_locations.service';

import { EventController } from './infrastructure/controller/events.controller';
import { LocationController } from './infrastructure/controller/locations.controller';
import { EventLocationController } from './infrastructure/controller/event_locations.controller';

import { EventsRoute } from './routes/events.routes';
import { LocationsRoute } from './routes/locations.routes';
import { EventLocationsRoute } from './routes/event_locations.routes';

const port = process.env.PORT;
const app = express();

// ✅ Habilitar CORS para todos los orígenes
app.use(cors({ origin: "*", credentials: true }));

const httpServer = createServer(app);
setupSwagger(app);

// Instancias
const eventRepo = new EventRepository(AppDataSource.getRepository(Event));
const eventService = new EventService(eventRepo);
const eventController = new EventController(eventService);

const locationRepo = new LocationRepository(AppDataSource.getRepository(Location));
const locationService = new LocationService(locationRepo);
const locationController = new LocationController(locationService);

const eventLocationRepo = new EventLocationRepository(AppDataSource.getRepository(EventLocation));
const eventLocationService = new EventLocationService(eventLocationRepo);
const eventLocationController = new EventLocationController(eventLocationService);

app.use(express.json());

app.use('/api/events', new EventsRoute(eventController).getRouter());
app.use('/api/events/locations', new LocationsRoute(locationController).getRouter());
app.use('/api/events/event-locations', new EventLocationsRoute(eventLocationController).getRouter());

httpServer.listen(port, () => {
  console.log(`running on port ${port}`);
});
