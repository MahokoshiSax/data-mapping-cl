import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DataMappingService } from './data-mapping.service';
import { DataMappingController } from './data-mapping.controller';
import { DataMapping, DataMappingSchema } from './schemas/data-mapping.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DataMapping.name, schema: DataMappingSchema },
    ]),
  ],
  controllers: [DataMappingController],
  providers: [DataMappingService],
})
export class DataMappingModule {} 