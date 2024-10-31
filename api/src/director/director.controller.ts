import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { DirectorService } from './director.service';
import { CreateDirectorDto } from './dto/create-director.dto';
import { UpdateDirectorDto } from './dto/update-director.dto';

@Controller('director')
export class DirectorController {
  constructor(private readonly directorService: DirectorService) {}

  @Post()
  create(@Body() createDirectorDto: CreateDirectorDto) {
    return this.directorService.create(createDirectorDto);
  }

  @Get('account_family')
  accountFamily(@Query('offset') offset: string, @Query('limit') limit: string) {
    const offsetNum = Number(offset) || 0;
    const limitNum = Number(limit) || 10;
    return this.directorService.accountFamily(offsetNum, limitNum)
  }

  @Get('account_student')
  accountStudent(@Query('offset') offset: string, @Query('limit') limit: string) {
    const offsetNum = Number(offset) || 0;
    const limitNum = Number(limit) || 10;
    return this.directorService.accountStudent(offsetNum, limitNum)
  }

  @Get()
  findAll() {
    return this.directorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.directorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDirectorDto: UpdateDirectorDto) {
    return this.directorService.update(+id, updateDirectorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.directorService.remove(+id);
  }
}
