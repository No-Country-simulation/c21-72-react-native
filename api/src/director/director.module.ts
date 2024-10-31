import { Module } from '@nestjs/common';
import { DirectorService } from './director.service';
import { DirectorController } from './director.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from 'src/person/entities/person.entity';
import { Student } from 'src/student/entities/student.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Person, Student])
  ],
  controllers: [DirectorController],
  providers: [DirectorService],
})
export class DirectorModule {}
