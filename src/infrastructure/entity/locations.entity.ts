import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from 'typeorm';
import { EventLocation } from './event_locations.entity';

@Entity('tbl_locations')
export class Location {
    @PrimaryGeneratedColumn({ name: 'location_id' })
    id!: number;

    @Column({ name: 'name', length: 255 })
    name!: string;
    
    @Column({ name: 'capacity' })
    capacity!: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;

    @Column({ name: 'is_active', default: true })
    isActive!: boolean;

    @Column({ name: 'deleted', default: false })
    deleted!: boolean;

    @OneToMany(() => EventLocation, eventLocation => eventLocation.location)
    eventLocations!: EventLocation[];
}