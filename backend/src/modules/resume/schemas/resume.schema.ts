import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Resume extends Document {
  @Prop({ required: true })
  fileName: string;

  @Prop({ required: true })
  filePath: string;

  @Prop()
  url: string;

  @Prop()
  description: string;

  @Prop({ default: 'published' })
  status: 'draft' | 'published';
}

export const ResumeSchema = SchemaFactory.createForClass(Resume);
