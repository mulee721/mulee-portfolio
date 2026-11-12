import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Certificate } from './schemas/certificate.schema';

@Injectable()
export class CertificatesService {
  constructor(@InjectModel(Certificate.name) private certificateModel: Model<Certificate>) {}

  async create(createCertificateDto: any): Promise<Certificate> {
    const certificate = new this.certificateModel(createCertificateDto);
    return certificate.save();
  }

  async findAll(): Promise<Certificate[]> {
    return this.certificateModel.find({ status: 'published' }).sort({ order: 1 });
  }

  async findOne(id: string): Promise<Certificate> {
    const certificate = await this.certificateModel.findById(id);
    if (!certificate) throw new NotFoundException('Certificate not found');
    return certificate;
  }

  async update(id: string, updateCertificateDto: any): Promise<Certificate> {
    const certificate = await this.certificateModel.findByIdAndUpdate(id, updateCertificateDto, {
      new: true,
    });
    if (!certificate) throw new NotFoundException('Certificate not found');
    return certificate;
  }

  async delete(id: string): Promise<void> {
    const certificate = await this.certificateModel.findByIdAndDelete(id);
    if (!certificate) throw new NotFoundException('Certificate not found');
  }
}
