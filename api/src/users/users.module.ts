import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Person } from 'src/person/entities/person.entity';
import { Responsible } from 'src/responsible/entities/responsible.entity';
import { Student } from 'src/student/entities/student.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User,Person,Responsible, Student])
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
