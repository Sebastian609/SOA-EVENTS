import { IsNotEmpty, IsString, IsDate, IsBoolean, IsOptional, IsNumber } from 'class-validator';
import { Expose, Type } from 'class-transformer';

export class CreateEventDto {
  @IsNotEmpty()
  @IsString()
  @Expose()
  name: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  description: string;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  @Expose({ name: 'start_date' })
  startDate: Date;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  @Expose({ name: 'end_date' })
  endDate: Date;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  @Expose({ name: 'sale_start' })
  saleStart: Date;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  @Expose({ name: 'sale_end' })
  saleEnd: Date;
}

export class UpdateEventDto {
  @IsNotEmpty()
  @IsNumber()
  @Expose({ name: 'event_id' })
  eventId: number;

  @IsOptional()
  @IsString()
  @Expose()
  name?: string;

  @IsOptional()
  @IsString()
  @Expose()
  description?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  @Expose({ name: 'start_date' })
  startDate?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  @Expose({ name: 'end_date' })
  endDate?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  @Expose({ name: 'sale_start' })
  saleStart?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  @Expose({ name: 'sale_end' })
  saleEnd?: Date;

  @IsOptional()
  @IsBoolean()
  @Expose({ name: 'is_active' })
  isActive?: boolean;

  @IsOptional()
  @IsBoolean()
  @Expose()
  deleted?: boolean;
}
