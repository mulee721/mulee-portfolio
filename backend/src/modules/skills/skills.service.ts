import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Skill } from './schemas/skill.schema';

@Injectable()
export class SkillsService {
  constructor(@InjectModel(Skill.name) private skillModel: Model<Skill>) {}

  async create(createSkillDto: any): Promise<Skill> {
    const skill = new this.skillModel(createSkillDto);
    return skill.save();
  }

  async findAll(): Promise<Skill[]> {
    return this.skillModel.find({ status: 'published' }).sort({ order: 1 });
  }

  async findOne(id: string): Promise<Skill> {
    const skill = await this.skillModel.findById(id);
    if (!skill) throw new NotFoundException('Skill not found');
    return skill;
  }

  async update(id: string, updateSkillDto: any): Promise<Skill> {
    const skill = await this.skillModel.findByIdAndUpdate(id, updateSkillDto, { new: true });
    if (!skill) throw new NotFoundException('Skill not found');
    return skill;
  }

  async delete(id: string): Promise<void> {
    const skill = await this.skillModel.findByIdAndDelete(id);
    if (!skill) throw new NotFoundException('Skill not found');
  }
}
