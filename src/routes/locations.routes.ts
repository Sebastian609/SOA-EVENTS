import { Router } from 'express';
import { LocationController } from '../infrastructure/controller/locations.controller';

export class LocationsRoute {
    
    private readonly router: Router;
    private readonly locationController: LocationController;

    constructor(locationController: LocationController) {
        this.router = Router();
        this.locationController = locationController;
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.get('/', (req, res) => this.locationController.getAllLocations(req, res));
        this.router.get('/active', (req, res) => this.locationController.getActiveLocations(req, res));
        this.router.get('/paginated', (req, res) => this.locationController.getPaginated(req, res));
        this.router.get('/name/:name', (req, res) => this.locationController.getLocationByName(req, res));
        this.router.get('/:id', (req, res) => this.locationController.getLocationById(req, res));

        this.router.post('/', (req, res) => this.locationController.createLocation(req, res));
        this.router.put('/:id', (req, res) => this.locationController.updateLocation(req, res));
        this.router.delete('/:id', (req, res) => this.locationController.deleteLocation(req, res));
        this.router.patch('/:id/activate', (req, res) => this.locationController.activateLocation(req, res));
        this.router.patch('/:id/deactivate', (req, res) => this.locationController.deactivateLocation(req, res));
    }

    public getRouter(): Router {
        return this.router;
    }
}
