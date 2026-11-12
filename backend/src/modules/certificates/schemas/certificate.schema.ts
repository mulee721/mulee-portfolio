import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Certificate extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  issuer: string;

  @Prop()
  description: string;

  @Prop()
  certificateUrl: string;

  @Prop()
  image: string;

  @Prop()
  issueDate: Date;

  @Prop()
  expirationDate: Date;

  @Prop({ default: false })
  doesNotExpire: boolean;

  @Prop({ default: 'published' })
  status: 'draft' | 'published';

  @Prop({ default: 0 })
  order: number;
}

export const CertificateSchema = SchemaFactory.createForClass(Certificate);
