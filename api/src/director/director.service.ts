import { Injectable } from '@nestjs/common';
import { CreateDirectorDto } from './dto/create-director.dto';
import { UpdateDirectorDto } from './dto/update-director.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from 'src/person/entities/person.entity';
import { Student } from 'src/student/entities/student.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DirectorService {
  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ){}


  create(createDirectorDto: CreateDirectorDto) {
    return 'This action adds a new director';
  }

  async accountFamily(offset: number =0, limit: number = 10){
    // return this.personRepository.findOneBy({account: 'solicitado'})

    // const responsible = await this.responsibleRepository.findOne({
    //   where: {
    //     person: {id: personId}, 
    //     student: {id: student.id}
    //   }
    // })

    const persons = await this.personRepository.find({
      where: { account: 'solicitado' },
      skip: offset,
      take: limit,
    })
    return persons;
  }

  async accountStudent(offset: number =0, limit: number = 10){
    const students = await this.studentRepository.find({
      where: { account: 'solicitado' },
      skip: offset,
      take: limit,
    })
    return students;
  }

  findAll() {
    return `This action returns all director`;
  }

  findOne(id: number) {
    return `This action returns a #${id} director`;
  }

  update(id: number, updateDirectorDto: UpdateDirectorDto) {
    return `This action updates a #${id} director`;
  }

  remove(id: number) {
    return `This action removes a #${id} director`;
  }
}
