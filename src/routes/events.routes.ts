import { Router } from 'express';
import { EventController } from '../infrastructure/controller/events.controller';

export class EventsRoute {

    private readonly router: Router;
    private readonly eventController: EventController;

    constructor(eventController: EventController) {
        this.router = Router();
        this.eventController = eventController;
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.get('/', (req, res) => this.eventController.getAllEvents(req, res));
        this.router.get('/active', (req, res) => this.eventController.getActiveEvents(req, res));
        this.router.get('/paginated', this.eventController.getPaginated.bind(this.eventController));
        this.router.get('/name/:name', (req, res) => this.eventController.getEventByName(req, res));
        this.router.get('/start-date', (req, res) => this.eventController.getEventsByStartDate(req, res));
        this.router.get('/sale-start', (req, res) => this.eventController.getEventsBySaleStart(req, res));
        this.router.get('/:id', (req, res) => this.eventController.getEventById(req, res));

        this.router.post('/', (req, res) => this.eventController.createEvent(req, res));
        this.router.put('/:id', (req, res) => this.eventController.updateEvent(req, res));
        this.router.delete('/:id', (req, res) => this.eventController.deleteEvent(req, res));
        this.router.patch('/:id/activate', (req, res) => this.eventController.activateEvent(req, res));
        this.router.patch('/:id/deactivate', (req, res) => this.eventController.deactivateEvent(req, res));
    }

    public getRouter(): Router {
        return this.router;
    }
}