import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateImmunizationsDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}