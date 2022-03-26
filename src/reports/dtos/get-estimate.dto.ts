import { Transform } from 'class-transformer';
import {
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class GetEstimateDto {
  @IsString()
  make: string;

  @IsString()
  model: string;

  @Transform(({ value }) => parseInt(value)) // value = incoming year
  @IsNumber()
  @Min(1933)
  @Max(2050)
  year: number;

  @Transform(({ value }) => parseInt(value)) // value = incoming mileage
  @IsNumber()
  @Min(0)
  @Max(800000)
  mileage: number;

  @Transform(({ value }) => parseFloat(value)) // value = incoming lng
  @IsLongitude()
  lng: number;

  @Transform(({ value }) => parseFloat(value)) // value = incoming lat
  @IsLatitude()
  lat: number;
}
