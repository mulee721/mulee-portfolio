import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ResumeService } from './resume.service';
import { ResumeController } from './resume.controller';
import { Resume, ResumeSchema } from './schemas/resume.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Resume.name, schema: ResumeSchema }])],
  controllers: [ResumeController],
  providers: [ResumeService],
})
export class ResumeModule {}
