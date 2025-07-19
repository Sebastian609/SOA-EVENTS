import { Request, response, Response } from 'express';
import { EventLocationService } from '../../service/event_locations.service';
import { CreateEventLocationDto, UpdateEventLocationDto } from '../dto/event_locations.dto';
import { instanceToPlain, plainToInstance } from "class-transformer";

export class EventLocationController {

    private readonly eventLocationService: EventLocationService;

    public constructor(service: EventLocationService) {
        this.eventLocationService = service;
    }

    async getAllEventLocations(req: Request, res: Response) {
    try {
        const locations = await this.eventLocationService.getAllEventLocations();
        res.status(200).json(locations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

    async getEventLocationById(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const location = await this.eventLocationService.getEventLocationById(id);
            res.status(200).json(location);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async getByEvent(req: Request, res: Response) {
        try {
            const eventId = Number(req.params.eventId);
            const result = await this.eventLocationService.getByEvent(eventId);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getByLocation(req: Request, res: Response) {
        try {
            const locationId = Number(req.params.locationId);
            const result = await this.eventLocationService.getByLocation(locationId);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getActiveByEvent(req: Request, res: Response) {
        try {
            const eventId = Number(req.params.eventId);
            const result = await this.eventLocationService.getActiveByEvent(eventId);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async createEventLocation(req: Request, res: Response) {
        try {
            const data: CreateEventLocationDto = req.body;
            const created = await this.eventLocationService.createEventLocation(data);
            res.status(201).json(created);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async updateEventLocation(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const data = plainToInstance(UpdateEventLocationDto, req.body, {
                excludeExtraneousValues: true,
            });
            const updated = await this.eventLocationService.updateEventLocation(id, data);
            res.status(200).json(updated);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async deleteEventLocation(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            await this.eventLocationService.deleteEventLocation(id);
            res.status(200).json({ message: 'EventLocation deleted' });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async activate(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            await this.eventLocationService.activateEventLocation(id);
            res.status(200).json({ message: 'Activated successfully' });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async deactivate(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            await this.eventLocationService.deactivateEventLocation(id);
            res.status(200).json({ message: 'Deactivated successfully' });
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

            const result = await this.eventLocationService.getPaginated(page - 1, limit);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async isAvailable(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const eventLocation = await this.eventLocationService.isAvailable(id);
            res.status(200).json({ isAvailable: true, eventLocation });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
}