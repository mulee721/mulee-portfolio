import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Service extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  icon: string;

  @Prop({ default: 0 })
  order: number;

  @Prop({ default: 'published' })
  status: 'draft' | 'published';
}

export const ServiceSchema = SchemaFactory.createForClass(Service);
