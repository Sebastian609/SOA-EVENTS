import { Repository, DeleteResult, UpdateResult } from "typeorm";
import { EventLocation } from "../infrastructure/entity/event_locations.entity";
import { IBaseRepository } from "./base-repository.interface";

export class EventLocationRepository implements IBaseRepository<EventLocation> {
    
    private readonly repository: Repository<EventLocation>

    public constructor(_repository: Repository<EventLocation>) {
        this.repository = _repository;
    }
    
    async getPaginated(limit: number, offset: number): Promise<EventLocation[]> {
        if (limit < 1 || offset < 0) {
            throw new Error("Invalid pagination parameters");
        }

        return this.repository.find({
            skip: offset,
            take: limit,
            relations: {
                event: true,
                location: true,
            },
            order: {
                createdAt: "DESC",
            },
            where: {
                deleted: false,
            },
        });
    }

    async findAll(): Promise<EventLocation[]> {
        return this.repository.find();
    }

    async findById(id: number): Promise<EventLocation> {
        const eventLocation = await this.repository.findOne({
            where: { id },
            relations: ['event', 'location']
        });

        if (!eventLocation) {
            throw new Error(`Event-location with ID ${id} not found`);
        }
        return eventLocation;
    }

    async findByCriteria(criteria: Partial<EventLocation>): Promise<EventLocation[]> {
        return this.repository.find({ where: criteria });
    }

    async create(entity: Partial<EventLocation>): Promise<EventLocation> {
        const eventLocation = this.repository.create(entity);
        return this.repository.save(eventLocation);
    }

    async update(id: number, entity: Partial<EventLocation>): Promise<EventLocation> {
        await this.repository.update(id, entity);
        const updatedEventLocation = await this.findById(id);
        return updatedEventLocation;
    }

    async delete(id: number): Promise<DeleteResult> {
        return this.repository.delete(id);
    }

    async softDelete(id: number): Promise<UpdateResult> {
        return this.repository.update(id, { deleted: true });
    }

    async restore(id: number): Promise<UpdateResult> {
        return this.repository.restore(id);
    }

    async count(criteria?: Partial<EventLocation>): Promise<number> {
        return this.repository.count({ where: criteria });
    }

    // Métodos específicos para EventLocation
    async findByEvent(eventId: number): Promise<EventLocation[]> {
        return await this.repository.find({
            where: { event: { id: eventId } },
            relations: ['event', 'location'],
        });
    }

    async findByLocation(locationId: number): Promise<EventLocation[]> {
        return await this.repository.find({
            where: { location: { id: locationId } },
            relations: ['event', 'location'],
        });
    }

    async findActiveByEvent(eventId: number): Promise<EventLocation[]> {
        return await this.repository.find({
            where: {
                event: { id: eventId },
                isActive: true,
                deleted: false,
            },
            relations: ['location'],
            });
    }

   // Versión ligeramente más optimizada (no selecciona los datos, solo los une para filtrar)
async isAvailable(id: number): Promise<EventLocation> {
    const eventLocation = await this.repository.createQueryBuilder("event_location")
        .leftJoinAndSelect("event_location.event", "event")
        .leftJoinAndSelect("event_location.location", "location")
        .where("event_location.isActive = true")
        .andWhere("event_location.deleted = false")
        .andWhere("event.isActive = true")
        .andWhere("event.deleted = false")
        .andWhere("location.isActive = true")
        .andWhere("location.deleted = false")
        .andWhere("event.saleStart <= NOW()")
        .andWhere("event.saleEnd > NOW()")
        .andWhere("event_location.id = :id", { id: id })
        .getOneOrFail();

    return eventLocation;
}

    async activate(id: number): Promise<void> {
        await this.repository.update(id, { isActive: true });
    }

    async deactivate(id: number): Promise<void> {
        await this.repository.update(id, { isActive: false });
    }
}