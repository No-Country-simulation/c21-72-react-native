import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';

@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Get()
  async findAll(@Query('offset') offset: string, @Query('limit') limit: string, ) {
    const offsetNum = Number(offset) || 0;
    const limitNum = Number(limit) || 10;
    return this.teacherService.findAll(offsetNum, limitNum);
    // const [teachers, total] = await this.teacherService.findAll(offsetNum, limitNum);
    // return {
    //   teachers,
    //   total, // Total de profesores en la base de datos
    // };
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.teacherService.findOne(id)
  }

  
}
