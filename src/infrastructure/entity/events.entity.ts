import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from 'typeorm';
import { EventLocation } from './event_locations.entity';

@Entity('tbl_events')
export class Event {
    @PrimaryGeneratedColumn({ name: 'event_id' })
    id!: number;

    @Column({ name: 'name', length: 255 })
    name!: string;

    @Column({ name: 'description', length: 255 })
    description!: string;

    @UpdateDateColumn({ name: 'start_date' })
    startDate! : Date;

    @UpdateDateColumn({ name: 'end_date' })
    endDate! : Date;

    @UpdateDateColumn({ name: 'sale_start' })
    saleStart! : Date;

    @UpdateDateColumn({ name: 'sale_end' })
    saleEnd! : Date;

    @CreateDateColumn({ name: 'created_at' })
    createdAt! : Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt! : Date;

    @Column({ name: 'is_active', default: true })
    isActive!: boolean;

    @Column({ name: 'deleted', default: false })
    deleted!: boolean;

    @OneToMany(() => EventLocation, eventLocation => eventLocation.event)
    eventLocations!: EventLocation[];
}