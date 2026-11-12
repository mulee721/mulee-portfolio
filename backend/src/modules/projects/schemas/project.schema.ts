import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Project extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  image: string;

  @Prop()
  thumbnail: string;

  @Prop({ type: [String] })
  technologies: string[];

  @Prop()
  demoUrl: string;

  @Prop()
  codeUrl: string;

  @Prop({ type: [String] })
  images: string[];

  @Prop({ default: 'published' })
  status: 'draft' | 'published';

  @Prop({ default: 0 })
  order: number;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
