import { Expose } from "class-transformer";
import { IsNotEmpty, IsString, IsNumber, IsOptional } from "class-validator";

export class CreateLocationDto {
  @IsNotEmpty()
  @IsString()
  @Expose()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Expose()
  capacity: number;
}

export class UpdateLocationDto {
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  id: number;

  @IsOptional()
  @IsString()
  @Expose()
  name?: string;

  @IsOptional()
  @IsNumber()
  @Expose()
  capacity?: number;

  @IsOptional()
  @Expose({ name: 'is_active' })
  isActive?: boolean;

  @IsOptional()
  @Expose()
  deleted?: boolean;
}