import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Experience } from './schemas/experience.schema';

@Injectable()
export class ExperienceService {
  constructor(@InjectModel(Experience.name) private experienceModel: Model<Experience>) {}

  async create(createExperienceDto: any): Promise<Experience> {
    const experience = new this.experienceModel(createExperienceDto);
    return experience.save();
  }

  async findAll(): Promise<Experience[]> {
    return this.experienceModel.find({ status: 'published' }).sort({ order: 1, startDate: -1 });
  }

  async findOne(id: string): Promise<Experience> {
    const experience = await this.experienceModel.findById(id);
    if (!experience) throw new NotFoundException('Experience not found');
    return experience;
  }

  async update(id: string, updateExperienceDto: any): Promise<Experience> {
    const experience = await this.experienceModel.findByIdAndUpdate(id, updateExperienceDto, {
      new: true,
    });
    if (!experience) throw new NotFoundException('Experience not found');
    return experience;
  }

  async delete(id: string): Promise<void> {
    const experience = await this.experienceModel.findByIdAndDelete(id);
    if (!experience) throw new NotFoundException('Experience not found');
  }
}
