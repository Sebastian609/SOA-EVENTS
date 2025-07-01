import { Event } from '../infrastructure/entity/events.entity';
import { EventRepository } from '../repository/events.repository';
import { CreateEventDto, UpdateEventDto } from '../infrastructure/dto/events.dto';
import { plainToInstance } from 'class-transformer';
import { getPaginated } from "../utils/getPaginated";

export class EventService {

    private readonly eventRepository: EventRepository;

    public constructor(_eventRepository: EventRepository) {
        this.eventRepository = _eventRepository;
    }

    async getAllEvents(): Promise<Event[]> {
        return this.eventRepository.findAll();
    }

    async getActiveEvents(): Promise<Event[]> {
        return this.eventRepository.findActive();
    }

    async getEventById(id: number): Promise<Event> {
        return this.eventRepository.findById(id);
    }

    async getEventByName(name: string): Promise<Event> {
        return this.eventRepository.findByName(name);
    }

    async getEventsByStartDate(startDate: Date): Promise<Event[]> {
        return this.eventRepository.findByStartDate(startDate);
    }

    async getEventsBySaleStart(saleStart: Date): Promise<Event[]> {
        return this.eventRepository.findBySaleStart(saleStart);
    }

    async createEvent(eventData: CreateEventDto): Promise<Event> {
        const event = plainToInstance(Event, eventData);
        const eventExist = await this.eventRepository.findByName(event.name);

        if (eventExist) {
            throw new Error(`Event with name: ${eventData.name} already exists.`);
        }

        return this.eventRepository.create(event);
    }

    async updateEvent(id: number, eventData: UpdateEventDto): Promise<Event> {
        const event = plainToInstance(Event, eventData);
        return this.eventRepository.update(id, event);
    }

    async deleteEvent(id: number): Promise<void> {
        await this.eventRepository.softDelete(id);
    }

    async deactivateEvent(id: number): Promise<void> {
        await this.eventRepository.deactivate(id);
    }

    async activateEvent(id: number): Promise<void> {
        await this.eventRepository.activate(id);
    }

    async getPaginated(page: number, itemsPerPage: number) {

        
        return getPaginated<Event>(this.eventRepository,page,itemsPerPage);
    }
}