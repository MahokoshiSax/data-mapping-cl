import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { DataMappingService } from './data-mapping.service';
import { CreateDataMappingDto } from './dto/create-data-mapping.dto';
import { UpdateDataMappingDto } from './dto/update-data-mapping.dto';
import { DataMapping } from './schemas/data-mapping.schema';

@Controller('api/v1/data-mappings')
export class DataMappingController {
  constructor(private readonly dataMappingService: DataMappingService) {}

  @Post()
  create(@Body() createDataMappingDto: CreateDataMappingDto): Promise<DataMapping> {
    return this.dataMappingService.create(createDataMappingDto);
  }

  @Get()
  findAll(@Query() query: any): Promise<DataMapping[]> {
    return this.dataMappingService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<DataMapping> {
    return this.dataMappingService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDataMappingDto: UpdateDataMappingDto,
  ): Promise<DataMapping> {
    return this.dataMappingService.update(id, updateDataMappingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.dataMappingService.remove(id);
  }
} 