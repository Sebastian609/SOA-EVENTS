import { Expose } from "class-transformer";
import { IsNotEmpty, IsString, IsNumber, IsOptional, IsBoolean } from "class-validator";

export class CreateEventLocationDto {
  @IsNotEmpty()
  @IsNumber()
  @Expose({ name: 'event_id' })
  eventId: number;

  @IsNotEmpty()
  @IsNumber()
  @Expose({ name: 'location_id' })
  locationId: number;

  @IsNotEmpty()
  @IsString()
  @Expose()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Expose()
  price: number;
}

export class UpdateEventLocationDto {
  @IsNumber()
  @Expose({ name: 'event_location_id' })
  eventLocationId: number;

  @IsOptional()
  @IsNumber()
  @Expose({ name: 'event_id' })
  eventId?: number;

  @IsOptional()
  @IsNumber()
  @Expose({ name: 'location_id' })
  locationId?: number;

  @IsOptional()
  @IsString()
  @Expose()
  name?: string;

  @IsOptional()
  @IsNumber()
  @Expose()
  price?: number;

  @IsOptional()
  @IsBoolean()
  @Expose({ name: 'is_active' })
  isActive?: boolean;

  @IsOptional()
  @IsBoolean()
  @Expose()
  deleted?: boolean;
}