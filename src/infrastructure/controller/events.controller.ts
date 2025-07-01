import { Request, Response } from 'express';
import { EventService } from '../../service/events.service';
import { CreateEventDto, UpdateEventDto } from '../dto/events.dto';
import { plainToInstance } from "class-transformer";
import { log } from 'node:console';

export class EventController {

    private readonly eventService: EventService;

    public constructor(service: EventService) {
        this.eventService = service;
    }

    async getAllEvents(req: Request, res: Response) {
        try {
            const events = await this.eventService.getAllEvents();
            res.status(200).json(events);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getActiveEvents(req: Request, res: Response) {
        try {
            const events = await this.eventService.getActiveEvents();
            res.status(200).json(events);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getEventById(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const event = await this.eventService.getEventById(id);
            res.status(200).json(event);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async getEventByName(req: Request, res: Response) {
        try {
            const { name } = req.params;
            const event = await this.eventService.getEventByName(name);
            res.status(200).json(event);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async getEventsByStartDate(req: Request, res: Response) {
        try {
            const startDate = new Date(req.query.startDate as string);
            const events = await this.eventService.getEventsByStartDate(startDate);
            res.status(200).json(events);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getEventsBySaleStart(req: Request, res: Response) {
        try {
            const saleStart = new Date(req.query.saleStartDate as string);
            const events = await this.eventService.getEventsBySaleStart(saleStart);
            res.status(200).json(events);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async createEvent(req: Request, res: Response) {
        try {
            const eventData: CreateEventDto = req.body;
            const newEvent = await this.eventService.createEvent(eventData);
            res.status(201).json(newEvent);
        } catch (error) {
            if (error.message.includes('already exists')) {
                res.status(409).json({ message: error.message });
            } else {
                res.status(400).json({ message: error.message });
            }
        }
    }

    async updateEvent(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const data = plainToInstance(UpdateEventDto, req.body, {
                excludeExtraneousValues: true,
            });
            const updated = await this.eventService.updateEvent(id, data);
            res.status(200).json(updated);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async deleteEvent(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            await this.eventService.deleteEvent(id);
            res.status(200).json({ message: 'Event deleted' });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async activateEvent(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            await this.eventService.activateEvent(id);
            res.status(200).json({ message: 'Event activated' });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async deactivateEvent(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            await this.eventService.deactivateEvent(id);
            res.status(200).json({ message: 'Event deactivated' });
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

            const result = await this.eventService.getPaginated(page - 1, limit);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}