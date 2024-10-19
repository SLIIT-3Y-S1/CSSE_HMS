import { IsString, IsNotEmpty } from 'class-validator';

export class CreateAllergyDto {
  @IsString()
  @IsNotEmpty()
  patientID: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}