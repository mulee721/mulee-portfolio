import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Experience extends Document {
  @Prop({ required: true })
  company: string;

  @Prop({ required: true })
  position: string;

  @Prop()
  description: string;

  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop({ default: false })
  isCurrentlyWorking: boolean;

  @Prop({ type: [String] })
  technologies: string[];

  @Prop({ default: 'published' })
  status: 'draft' | 'published';

  @Prop({ default: 0 })
  order: number;
}

export const ExperienceSchema = SchemaFactory.createForClass(Experience);
