import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class DataMapping extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  department: string;

  @Prop({ type: [String] })
  dataSubjectTypes: string[];
}

export const DataMappingSchema = SchemaFactory.createForClass(DataMapping); 