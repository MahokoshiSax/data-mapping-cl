import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class DataSubjectType extends Document {
  @Prop({ required: true, unique: true })
  name: string;
}

export const DataSubjectTypeSchema = SchemaFactory.createForClass(DataSubjectType); 