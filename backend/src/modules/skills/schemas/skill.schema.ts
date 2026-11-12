import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Skill extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  category: string;

  @Prop({ default: 0 })
  level: number;

  @Prop()
  icon: string;

  @Prop({ default: 0 })
  order: number;

  @Prop({ default: 'published' })
  status: 'draft' | 'published';
}

export const SkillSchema = SchemaFactory.createForClass(Skill);
