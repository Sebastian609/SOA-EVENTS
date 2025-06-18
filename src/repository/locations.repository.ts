import { Repository, DeleteResult, UpdateResult } from 'typeorm';
import { Location } from '../infrastructure/entity/locations.entity';
import { IBaseRepository } from './base-repository.interface';

export class LocationRepository implements IBaseRepository<Location> {

    private readonly repository: Repository<Location>
    
    public constructor(_repository: Repository<Location>) {
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
                eventLocations: true, // si deseas incluir relaciones con EventLocation
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

    async findAll(): Promise<Location[]> {
        return this.repository.find();
    }

    async findById(id: number): Promise<Location> {
        const location = this.repository.findOneBy({ id });
        if (!location) {
            throw new Error(`Location with ID ${id} not found`);
        }
        return location;
    }

    async findByCriteria(criteria: Partial<Location>): Promise<Location[]> {
        return this.repository.find({ where: criteria });
    }

    async create(entity: Partial<Location>): Promise<Location> {
        const location = this.repository.create(entity);
        return this.repository.save(location);
    }

    async update(id: number, entity: Partial<Location>): Promise<Location> {
        await this.repository.update(id, entity);
        const updatedLocation = await this.findById(id);
        return updatedLocation;
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
    async count(criteria?: Partial<Location>): Promise<number> {
        return this.repository.count({ where: criteria });
    }

    // Métodos específicos para Location
    async findByName(name: string): Promise<Location | null> {
        return this.repository.findOne({ where: { name } });
    }

    async findActive(): Promise<Location[]> {
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