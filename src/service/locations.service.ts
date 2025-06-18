import { Location } from '../infrastructure/entity/locations.entity';
import { LocationRepository } from '../repository/locations.repository';
import { CreateLocationDto, UpdateLocationDto } from '../infrastructure/dto/locations.dto';
import { plainToInstance } from 'class-transformer';
import { getPaginated } from "../utils/getPaginated";

export class LocationService {

    private readonly locationRepository: LocationRepository;

    public constructor(_locationRepository: LocationRepository) {
        this.locationRepository = _locationRepository;
    }

    async getAllLocations(): Promise<Location[]> {
        return this.locationRepository.findAll();
    }

    async getActiveLocations(): Promise<Location[]> {
        return this.locationRepository.findActive();
    }

    async getLocationById(id: number): Promise<Location> {
        return this.locationRepository.findById(id);
    }

    async getLocationByName(name: string): Promise<Location> {
        return this.locationRepository.findByName(name);
    }

    async createLocation(locationData: CreateLocationDto): Promise<Location> {
        const location = plainToInstance(Location, locationData);
        const locationExist = await this.locationRepository.findByName(location.name);

        if (locationExist) {
            throw new Error(`Location with name: ${locationData.name} already exists.`);
        }

        return this.locationRepository.create(location);
    }

    async updateLocation(id: number, locationData: UpdateLocationDto): Promise<Location> {
        const location = plainToInstance(Location, locationData);
        return this.locationRepository.update(id, location);
    }

    async deleteLocation(id: number): Promise<void> {
        await this.locationRepository.softDelete(id);
    }

    async deactivateLocation(id: number): Promise<void> {
        await this.locationRepository.deactivate(id);
    }

    async activateLocation(id: number): Promise<void> {
        await this.locationRepository.activate(id);
    }

    async getPaginated(page: number, itemsPerPage: number) {
        return getPaginated<Location>(this.locationRepository, page, itemsPerPage);
    }
}