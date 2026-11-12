import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Education } from './schemas/education.schema';

@Injectable()
export class EducationService {
  constructor(@InjectModel(Education.name) private educationModel: Model<Education>) {}

  async create(createEducationDto: any): Promise<Education> {
    const education = new this.educationModel(createEducationDto);
    return education.save();
  }

  async findAll(): Promise<Education[]> {
    return this.educationModel.find({ status: 'published' }).sort({ order: 1, startDate: -1 });
  }

  async findOne(id: string): Promise<Education> {
    const education = await this.educationModel.findById(id);
    if (!education) throw new NotFoundException('Education not found');
    return education;
  }

  async update(id: string, updateEducationDto: any): Promise<Education> {
    const education = await this.educationModel.findByIdAndUpdate(id, updateEducationDto, {
      new: true,
    });
    if (!education) throw new NotFoundException('Education not found');
    return education;
  }

  async delete(id: string): Promise<void> {
    const education = await this.educationModel.findByIdAndDelete(id);
    if (!education) throw new NotFoundException('Education not found');
  }
}
