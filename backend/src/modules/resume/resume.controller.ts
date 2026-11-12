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
import { ResumeService } from './resume.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('resume')
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}

  @Get()
  async findAll() {
    return this.resumeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.resumeService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createResumeDto: any) {
    return this.resumeService.create(createResumeDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() updateResumeDto: any) {
    return this.resumeService.update(id, updateResumeDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    return this.resumeService.delete(id);
  }
}
