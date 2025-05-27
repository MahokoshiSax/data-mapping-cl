import { PartialType } from '@nestjs/mapped-types';
import { CreateDataMappingDto } from './create-data-mapping.dto';

export class UpdateDataMappingDto extends PartialType(CreateDataMappingDto) {} 