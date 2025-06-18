import { Router } from 'express';
import { EventLocationController } from '../infrastructure/controller/event_locations.controller';

export class EventLocationsRoute {
    private readonly router: Router;
    private readonly eventLocationController: EventLocationController;

    constructor(eventLocationController: EventLocationController) {
        this.router = Router();
        this.eventLocationController = eventLocationController;
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.get('/', (req, res) => this.eventLocationController.getAllEventLocations(req, res));
        this.router.get('/paginated', (req, res) => this.eventLocationController.getPaginated(req, res));
        this.router.get('/event/:eventId', (req, res) => this.eventLocationController.getByEvent(req, res));
        this.router.get('/location/:locationId', (req, res) => this.eventLocationController.getByLocation(req, res));
        this.router.get('/event/:eventId/active', (req, res) => this.eventLocationController.getActiveByEvent(req, res));
        this.router.get('/:id', (req, res) => this.eventLocationController.getEventLocationById(req, res));

        this.router.post('/', (req, res) => this.eventLocationController.createEventLocation(req, res));
        this.router.put('/:id', (req, res) => this.eventLocationController.updateEventLocation(req, res));
        this.router.delete('/:id', (req, res) => this.eventLocationController.deleteEventLocation(req, res));
        this.router.patch('/:id/activate', (req, res) => this.eventLocationController.activate(req, res));
        this.router.patch('/:id/deactivate', (req, res) => this.eventLocationController.deactivate(req, res));
    }

    public getRouter(): Router {
        return this.router;
    }
}
