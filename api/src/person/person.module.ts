import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { TeacherService } from 'src/teacher/teacher.service';
import { Person } from './entities/person.entity';
import { User } from 'src/users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from 'src/teacher/entities/teacher.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Person, User, Teacher]),
  UsersModule
],
  controllers: [PersonController],
  providers: [PersonService, TeacherService],
  exports: [PersonService],
})
export class PersonModule {}
