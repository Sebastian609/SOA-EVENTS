import { Repository, DeleteResult, UpdateResult } from 'typeorm';
import { Event } from '../infrastructure/entity/events.entity';
import { IBaseRepository } from './base-repository.interface';

export class EventRepository implements IBaseRepository<Event> {

    private readonly repository: Repository<Event>

    public constructor(_repository: Repository<Event>) {
        this.repository = _repository;
    }

    async getPaginated(limit: number, offset: number): Promise<any> {
        if (limit < 1 || offset < 0) {
            throw new Error("Invalid pagination parameters");
        }

        const [data] = await this.repository.findAndCount({
            skip: offset,
            take: limit,
            relations: {
            eventLocations: true, // Si deseas incluir la relación con eventLocations
            },
            order: {
            createdAt: "DESC",
            },
            where: {
            deleted: false,
            },
        });

        const count = await this.repository.count({
            where: {
                deleted: false,
            },
        });

        const response = {
            locations: data,
            count: count,
        };

        return response;
    }


    async findAll(): Promise<Event[]> {
        return this.repository.find();
    }

    async findById(id: number): Promise<Event> {
        const event = await this.repository.findOneBy({ id });
        if (!event) {
            throw new Error(`Event with ID ${id} not found`);
        }
        return event;
    }

    async findByCriteria(criteria: Partial<Event>): Promise<Event[]> {
        return this.repository.find({ where: criteria });
    }

    async create(entity: Partial<Event>): Promise<Event> {
        const newEvent = this.repository.create(entity);
        return this.repository.save(newEvent);
    }

    async update(id: number, entity: Partial<Event>): Promise<Event> {
        await this.repository.update(id, entity);
        const updatedEvent = await this.findById(id);
        return updatedEvent;
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

    async count(criteria?: Partial<Event>): Promise<number> {
        return this.repository.count({ where: criteria });
    }

    // Métodos específicos para Event
    async findByName(name: string): Promise<Event | null> {
        return this.repository.findOne({ where: { name } });
    }

    async findByStartDate(date: Date): Promise<Event[]> {
        return this.repository.find({ where: { startDate: date } });
    }

    async findBySaleStart(date: Date): Promise<Event[]> {
        return this.repository.find({ where: { saleStart: date } });
    }

    async findActive(): Promise<Event[]> {
        return this.repository.find({ where: 
            { isActive: true, deleted: false } });
    }

    async activate(id: number): Promise<void> {
        await this.repository.update(id, { isActive: true });
    }

    async deactivate(id: number): Promise<void> {
        await this.repository.update(id, { isActive: false });
    }
}