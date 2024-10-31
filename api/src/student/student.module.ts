import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Person } from '../person/entities/person.entity';
import { Responsible } from 'src/responsible/entities/responsible.entity';
import { PersonService } from 'src/person/person.service';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { TeacherModule } from 'src/teacher/teacher.module';
import { PersonModule } from 'src/person/person.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Student, Person, Responsible]),
    UsersModule,
    TeacherModule,
    PersonModule
  ],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
