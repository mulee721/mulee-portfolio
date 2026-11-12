import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Resume } from './schemas/resume.schema';

@Injectable()
export class ResumeService {
  constructor(@InjectModel(Resume.name) private resumeModel: Model<Resume>) {}

  async create(createResumeDto: any): Promise<Resume> {
    const resume = new this.resumeModel(createResumeDto);
    return resume.save();
  }

  async findAll(): Promise<Resume[]> {
    return this.resumeModel.find({ status: 'published' });
  }

  async findOne(id: string): Promise<Resume> {
    const resume = await this.resumeModel.findById(id);
    if (!resume) throw new NotFoundException('Resume not found');
    return resume;
  }

  async update(id: string, updateResumeDto: any): Promise<Resume> {
    const resume = await this.resumeModel.findByIdAndUpdate(id, updateResumeDto, { new: true });
    if (!resume) throw new NotFoundException('Resume not found');
    return resume;
  }

  async delete(id: string): Promise<void> {
    const resume = await this.resumeModel.findByIdAndDelete(id);
    if (!resume) throw new NotFoundException('Resume not found');
  }
}
