import { IsString } from 'class-validator';

export class CreateDataSubjectTypeDto {
  @IsString()
  name: string;
} 