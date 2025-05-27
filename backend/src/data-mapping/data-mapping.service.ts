import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DataMapping } from './schemas/data-mapping.schema';
import { CreateDataMappingDto } from './dto/create-data-mapping.dto';
import { UpdateDataMappingDto } from './dto/update-data-mapping.dto';

@Injectable()
export class DataMappingService {
  constructor(
    @InjectModel(DataMapping.name) private dataMappingModel: Model<DataMapping>,
  ) {}

  async create(createDataMappingDto: CreateDataMappingDto): Promise<DataMapping> {
    const createdDataMapping = new this.dataMappingModel(createDataMappingDto);
    return createdDataMapping.save();
  }

  async findAll(query: any): Promise<DataMapping[]> {
    const filter: any = {};

    if (query.title) {
      filter.title = { $regex: query.title, $options: 'i' };
    }
    if (query.department) {
      filter.department = query.department;
    }
    if (query.dataSubjectType) {
      filter.dataSubjectTypes = query.dataSubjectType;
    }
    if (query.description) {
      filter.description = { $regex: query.description, $options: 'i' };
    }

    return this.dataMappingModel
      .find(filter)
      .sort({ createdAt: -1 })
      .exec();
  }

  async findOne(id: string): Promise<DataMapping> {
    const dataMapping = await this.dataMappingModel.findById(id).exec();

    if (!dataMapping) {
      throw new NotFoundException('Data mapping not found');
    }

    return dataMapping;
  }

  async update(id: string, updateDataMappingDto: UpdateDataMappingDto): Promise<DataMapping> {
    const updatedDataMapping = await this.dataMappingModel
      .findByIdAndUpdate(id, updateDataMappingDto, { new: true })
      .exec();

    if (!updatedDataMapping) {
      throw new NotFoundException('Data mapping not found');
    }

    return updatedDataMapping;
  }

  async remove(id: string): Promise<void> {
    const result = await this.dataMappingModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Data mapping not found');
    }
  }
} 