import { Injectable } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from './entities/teacher.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
  ){}

  async create(personId : number) {
    const teacher = this.teacherRepository.create({
      person: {id: personId}
    });

    await this.teacherRepository.save(teacher);

    return teacher;
   }

  async findAll(offset: number =0, limit: number = 10) {
    const teachers = await this.teacherRepository.find({
       relations: ['person'],
       skip: offset,
       take: limit,
     })

    return teachers;

    // return await this.teacherRepository.findAndCount({
    //   relations: ['person'],
    //   skip: offset,
    //   take: limit,
    // });

    // return await this.teacherRepository.find()
  }

  async findOne(id: number) {
    const teacher_person = await this.teacherRepository.findOne({
      relations: ['person'],
      where: { id: id }
  });

  const teacher = {
    id: teacher_person.id, // Asumiendo que person.id es el ID del teacher
    personId: teacher_person.person.id, // Aquí puedes usar person.id si quieres el mismo ID
    address: teacher_person.person.address,
    deleteAt: teacher_person.person.deleteAt,
    email_address: teacher_person.person.email_address,
    full_name: teacher_person.person.full_name,
    last_name: teacher_person.person.last_name,
    male: teacher_person.person.male,
  };
  return teacher;


    return `This action returns a #${id} teacher`;
  }

  update(id: number, updateTeacherDto: UpdateTeacherDto) {
    return `This action updates a #${id} teacher`;
  }

  remove(id: number) {
    return `This action removes a #${id} teacher`;
  }
}
