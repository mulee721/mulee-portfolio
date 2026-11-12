import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Profile extends Document {
  @Prop({ required: true })
  fullName: string;

  @Prop()
  title: string;

  @Prop()
  bio: string;

  @Prop()
  profileImage: string;

  @Prop()
  coverImage: string;

  @Prop()
  email: string;

  @Prop()
  phone: string;

  @Prop()
  location: string;

  @Prop({ type: Object })
  socialLinks: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    portfolio?: string;
  };

  @Prop({ default: 'published' })
  status: 'draft' | 'published';
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
