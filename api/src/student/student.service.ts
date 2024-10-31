import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { EntityManager, Repository, Transaction, DataSource  } from 'typeorm';
import { Person } from 'src/person/entities/person.entity';
import { Responsible } from 'src/responsible/entities/responsible.entity';
import { PersonService } from 'src/person/person.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
    @InjectRepository(Responsible)
    private readonly responsibleRepository: Repository<Responsible>,
    private personService: PersonService,
    private userService: UsersService,
    private dataSoruce: DataSource

  ){}


  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const {family, ...studentData} = createStudentDto;

    console.log("create student ---")

    const queryRunner = this.dataSoruce.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try{

      const student = queryRunner.manager.create(Student, studentData);
      await queryRunner.manager.save(student);

      if(family && family.length >0){
        const responsibles = await Promise.all(family.map(async (member) => {
          const person = await this.personService.createFamily(member, queryRunner.manager)

          const responsible = queryRunner.manager.create(Responsible,{
            student, 
            person,
            type: member.type
          });
          return responsible;
        }));
        await queryRunner.manager.save(responsibles);
      }

      if (studentData.email_address){
        
        const username = `${studentData.full_name}  ${studentData.last_name}`
        //Cuando es de tipo teacher guardar
        const user = await this.userService.createUser(username,studentData.email_address, 'estudiante')

        const person_update = await queryRunner.manager.findOne(Student, {
          where: { id: student.id }
        });
    
        Object.assign(person_update, {userId: user.id})
        await queryRunner.manager.save(person_update)
      }
      await queryRunner.commitTransaction();
      return student;
    }catch(error){
      await queryRunner.rollbackTransaction();
      throw error;
    }
    finally{
      await queryRunner.release()
    }
  }


  findAll() {
    return `This action returns all student`;
  }

  findOne(id: number) {
    return `This action returns a #${id} student`;
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${id} student`;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}


