import { Request, Response } from 'express';
import { LocationService } from '../../service/locations.service';
import { CreateLocationDto, UpdateLocationDto } from '../dto/locations.dto';
import { plainToInstance } from "class-transformer";

export class LocationController {

    private readonly locationService: LocationService;

    public constructor(service: LocationService) {
        this.locationService = service;
    }

    async getAllLocations(req: Request, res: Response) {
        try {
            const locations = await this.locationService.getAllLocations();
            res.status(200).json(locations);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getActiveLocations(req: Request, res: Response) {
        try {
            const locations = await this.locationService.getActiveLocations();
            res.status(200).json(locations);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getLocationById(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const location = await this.locationService.getLocationById(id);
            res.status(200).json(location);
        } catch (error) {
            if (error.message.includes('not found')) {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({ message: error.message });
            }
        }
    }

    async getLocationByName(req: Request, res: Response) {
        try {
            const name = req.params.name;
            const location = await this.locationService.getLocationByName(name);
            res.status(200).json(location);
        } catch (error) {
            if (error.message.includes('not found')) {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({ message: error.message });
            }
        }
    }

    async createLocation(req: Request, res: Response) {
        try {
            const data: CreateLocationDto = req.body;
            const newLocation = await this.locationService.createLocation(data);
            res.status(201).json(newLocation);
        } catch (error) {
            if (error.message.includes('already exists')) {
                res.status(409).json({ message: error.message });
            } else {
                res.status(400).json({ message: error.message });
            }
        }
    }

    async updateLocation(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const data = plainToInstance(UpdateLocationDto, req.body, {
                excludeExtraneousValues: true,
            });

            const updatedLocation = await this.locationService.updateLocation(id, data);
            res.status(200).json(updatedLocation);
        } catch (error) {
            if (error.message.includes('not found')) {
                res.status(404).json({ message: error.message });
            } else if (error.message.includes('already exists')) {
                res.status(409).json({ message: error.message });
            } else {
                res.status(400).json({ message: error.message });
            }
        }
    }

    async deleteLocation(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            await this.locationService.deleteLocation(id);
            res.status(200).json({ message: 'Location deleted' });
        } catch (error) {
            if (error.message.includes('not found')) {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({ message: error.message });
            }
        }
    }

    async activateLocation(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            await this.locationService.activateLocation(id);
            res.status(200).json({ message: 'Location activated' });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async deactivateLocation(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            await this.locationService.deactivateLocation(id);
            res.status(200).json({ message: 'Location deactivated' });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getPaginated(req: Request, res: Response) {
        try {
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 10;

            if (page < 1 || limit < 1) {
                return res.status(400).json({ 
                    message: "Invalid pagination parameters. Page and limit must be greater than 0." 
                });
            }

            const result = await this.locationService.getPaginated(page - 1, limit);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}