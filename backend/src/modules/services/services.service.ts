import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Service } from './schemas/service.schema';

@Injectable()
export class ServicesService {
  constructor(@InjectModel(Service.name) private serviceModel: Model<Service>) {}

  async create(createServiceDto: any): Promise<Service> {
    const service = new this.serviceModel(createServiceDto);
    return service.save();
  }

  async findAll(): Promise<Service[]> {
    return this.serviceModel.find({ status: 'published' }).sort({ order: 1 });
  }

  async findOne(id: string): Promise<Service> {
    const service = await this.serviceModel.findById(id);
    if (!service) throw new NotFoundException('Service not found');
    return service;
  }

  async update(id: string, updateServiceDto: any): Promise<Service> {
    const service = await this.serviceModel.findByIdAndUpdate(id, updateServiceDto, { new: true });
    if (!service) throw new NotFoundException('Service not found');
    return service;
  }

  async delete(id: string): Promise<void> {
    const service = await this.serviceModel.findByIdAndDelete(id);
    if (!service) throw new NotFoundException('Service not found');
  }
}
