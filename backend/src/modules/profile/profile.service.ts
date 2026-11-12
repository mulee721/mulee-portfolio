import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Profile } from './schemas/profile.schema';
import { CreateProfileDto, UpdateProfileDto } from './dto/profile.dto';

@Injectable()
export class ProfileService {
  constructor(@InjectModel(Profile.name) private profileModel: Model<Profile>) {}

  async create(createProfileDto: CreateProfileDto): Promise<Profile> {
    const profile = new this.profileModel(createProfileDto);
    return profile.save();
  }

  async findAll(): Promise<Profile[]> {
    return this.profileModel.find({ status: 'published' }).sort({ createdAt: -1 });
  }

  async findOne(id: string): Promise<Profile> {
    const profile = await this.profileModel.findById(id);
    if (!profile) {
      throw new NotFoundException(`Profile with ID ${id} not found`);
    }
    return profile;
  }

  async update(id: string, updateProfileDto: UpdateProfileDto): Promise<Profile> {
    const profile = await this.profileModel.findByIdAndUpdate(id, updateProfileDto, {
      new: true,
    });
    if (!profile) {
      throw new NotFoundException(`Profile with ID ${id} not found`);
    }
    return profile;
  }

  async delete(id: string): Promise<void> {
    const profile = await this.profileModel.findByIdAndDelete(id);
    if (!profile) {
      throw new NotFoundException(`Profile with ID ${id} not found`);
    }
  }
}
