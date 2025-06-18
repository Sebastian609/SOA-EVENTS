import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    CreateDateColumn, 
    UpdateDateColumn, 
    ManyToOne,
    JoinColumn
} from 'typeorm';
import { Event } from './events.entity';
import { Location } from './locations.entity';

@Entity('tbl_event_locations')
export class EventLocation {
    @PrimaryGeneratedColumn({name: 'event_location_id'})
    id!: number;

    @Column({ name: 'name', length: 255 })
    name!: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price!: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;

    @Column({ name: 'is_active', default: true })
    isActive!: boolean;

    @Column({ name: 'deleted', default: false })
    deleted!: boolean;

    @ManyToOne(() => Event, event => event.eventLocations)
    @JoinColumn({ name: 'event_id' })
    event!: Event;

    @ManyToOne(() => Location, location => location.eventLocations)
    @JoinColumn({ name: 'location_id' })
    location!: Location;
}