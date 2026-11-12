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
import { SkillsService } from './skills.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Get()
  async findAll() {
    return this.skillsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.skillsService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createSkillDto: any) {
    return this.skillsService.create(createSkillDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() updateSkillDto: any) {
    return this.skillsService.update(id, updateSkillDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    return this.skillsService.delete(id);
  }
}
