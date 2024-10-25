import { Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { TeacherService } from 'src/teacher/teacher.service';

@Injectable()
export class PersonService {
  mailerService: any;

  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
    private userService: UsersService,
    private teacherService: TeacherService,
  ){}


  async create({personId,
    full_name,
    last_name,
    email_address,
    address,
    male,
    deleteAt,
    type}: CreatePersonDto) {
    
    const person = this.personRepository.create({
      id: personId,
      full_name,
      last_name, 
      email_address, 
      address,
      male,
      userId: null
    });

    await this.personRepository.save(person)

    const username = `${person.full_name}  ${person.last_name}`

    //Registrar el usuario
    //Rol si es maestro teacher
    //Rol si es estudiante student
    const role = type

    //Cuando es de tipo teacher guardar
    const user = await this.userService.createUser(username,person.email_address, role)


    const person_update = await this.personRepository.findOne({
      where: { id: person.id }
    });

    Object.assign(person_update, {userId: user.id})
    await this.personRepository.save(person_update)

    
    if (role === "profesor") {
      const teachercreate = await this.teacherService.create(person.id)
      
      const teacher = {
        id: teachercreate.id,
        personId: person.id, 
        address: person.address,
        deleteAt: person.deleteAt,
        email_address: person.email_address,
        full_name: person.full_name,
        last_name: person.last_name,
        male: person.male,
      };
      return teacher;
      // return {teacher, status: 200, message: 'Profesor creado exitosamente'}
    }
    
    

    return {person, status: 200, message: 'Padre creado exitosamente'}
  }

  findAll() {
    return `This action returns all person`;
  }

  findOne(id: number) {
    return `This action returns a #${id} person`;
  }

  update(id: number, updatePersonDto: UpdatePersonDto) {
    return `This action updates a #${id} person`;
  }

  remove(id: number) {
    return `This action removes a #${id} person`;
  }
}
