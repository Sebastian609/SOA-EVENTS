import { EventLocation } from '../infrastructure/entity/event_locations.entity';
import { EventLocationRepository } from '../repository/event_locations.repository';
import { CreateEventLocationDto, UpdateEventLocationDto } from '../infrastructure/dto/event_locations.dto';
import { plainToInstance } from 'class-transformer';
import { getPaginated } from "../utils/getPaginated";

export class EventLocationService {

    private readonly eventLocationRepository: EventLocationRepository;
    
    public constructor(_eventLocationRepository: EventLocationRepository) {
        this.eventLocationRepository = _eventLocationRepository;
    }

    async getAllEventLocations(): Promise<EventLocation[]> {
        return this.eventLocationRepository.findAll();
    }
    
    async getEventLocationById(id: number): Promise<EventLocation> {
        return this.eventLocationRepository.findById(id);
    }

    async getByEvent(eventId: number): Promise<EventLocation[]> {
        return this.eventLocationRepository.findByEvent(eventId);
    }

    async getByLocation(locationId: number): Promise<EventLocation[]> {
        return this.eventLocationRepository.findByLocation(locationId);
    }

    async getActiveByEvent(eventId: number): Promise<EventLocation[]> {
        return this.eventLocationRepository.findActiveByEvent(eventId);
    }

    async createEventLocation(data: CreateEventLocationDto): Promise<EventLocation> {
        const entity = plainToInstance(EventLocation, data);
        return this.eventLocationRepository.create(entity);
    }

    async updateEventLocation(id: number, data: UpdateEventLocationDto): Promise<EventLocation> {
        const entity = plainToInstance(EventLocation, data);
        return this.eventLocationRepository.update(id, entity);
    }

    async deleteEventLocation(id: number): Promise<void> {
        await this.eventLocationRepository.softDelete(id);
    }

    async activateEventLocation(id: number): Promise<void> {
        await this.eventLocationRepository.activate(id);
    }

    async deactivateEventLocation(id: number): Promise<void> {
        await this.eventLocationRepository.deactivate(id);
    }

    async getPaginated(page: number, itemsPerPage: number) {
        return getPaginated<EventLocation>(this.eventLocationRepository, page, itemsPerPage);
    }

    async isAvailable(id: number): Promise<EventLocation> {
        return this.eventLocationRepository.isAvailable(id);
    }
    
}