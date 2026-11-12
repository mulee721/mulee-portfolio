import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('experience')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

  @Get()
  async findAll() {
    return this.experienceService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.experienceService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createExperienceDto: any) {
    return this.experienceService.create(createExperienceDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() updateExperienceDto: any) {
    return this.experienceService.update(id, updateExperienceDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    return this.experienceService.delete(id);
  }
}
