import { IsString, IsOptional, IsArray } from 'class-validator';

export class CreateDataMappingDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  department: string;

  @IsArray()
  @IsString({ each: true })
  dataSubjectTypes: string[];
} 