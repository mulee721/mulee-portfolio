import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from './schemas/project.schema';

@Injectable()
export class ProjectsService {
  constructor(@InjectModel(Project.name) private projectModel: Model<Project>) {}

  async create(createProjectDto: any): Promise<Project> {
    const project = new this.projectModel(createProjectDto);
    return project.save();
  }

  async findAll(): Promise<Project[]> {
    return this.projectModel.find({ status: 'published' }).sort({ order: 1, createdAt: -1 });
  }

  async findAllDrafts(): Promise<Project[]> {
    return this.projectModel.find().sort({ order: 1, createdAt: -1 });
  }

  async findOne(id: string): Promise<Project> {
    const project = await this.projectModel.findById(id);
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return project;
  }

  async update(id: string, updateProjectDto: any): Promise<Project> {
    const project = await this.projectModel.findByIdAndUpdate(id, updateProjectDto, {
      new: true,
    });
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return project;
  }

  async delete(id: string): Promise<void> {
    const project = await this.projectModel.findByIdAndDelete(id);
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
  }

  async updateOrder(projects: { id: string; order: number }[]): Promise<Project[]> {
    const updated = await Promise.all(
      projects.map((p) => this.projectModel.findByIdAndUpdate(p.id, { order: p.order }, { new: true })),
    );
    return updated;
  }
}
