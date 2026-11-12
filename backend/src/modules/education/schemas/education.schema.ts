import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Education extends Document {
  @Prop({ required: true })
  institution: string;

  @Prop({ required: true })
  degree: string;

  @Prop()
  field: string;

  @Prop()
  description: string;

  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop()
  grade: string;

  @Prop({ default: 'published' })
  status: 'draft' | 'published';

  @Prop({ default: 0 })
  order: number;
}

export const EducationSchema = SchemaFactory.createForClass(Education);
