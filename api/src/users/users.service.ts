import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { randomBytes } from 'crypto';
import { MailerService } from '@nestjs-modules/mailer';
import * as bcryptjs from 'bcryptjs';
import { CreateUserParentDto } from './dto/create-user-parent.dto';
import { Person } from 'src/person/entities/person.entity';
import { Responsible } from 'src/responsible/entities/responsible.entity';
import { Student } from 'src/student/entities/student.entity';
import { RequestUserParentDto } from './dto/request-user-parent.dto';


@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    
    @InjectRepository(Responsible)
    private readonly responsibleRepository: Repository<Responsible>,
    private readonly mailerService: MailerService,
  ){}



  async createAdminIfNotExists() {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@demo.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'pass1234';

    const existingAdmin = await this.userRepository.findOne({ where: { email: adminEmail } });
    const name = 'director'

    if (!existingAdmin) {
      const hashedPassword = await bcryptjs.hash(adminPassword, 10);
      const admin = this.userRepository.create({
        name: name,
        email: adminEmail,
        password: hashedPassword,
        rol: 'director',
      });
      await this.userRepository.save(admin);
      // this.logger.log('Admin user created with email:', adminEmail);
    } else {
      console.log('Ya existe')
      // this.logger.log('Admin user already exists');
    }
  }


  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto)
  }

  async createUser(name: string, email:string, rol:string){
    const password = randomBytes(8).toString('hex');
    const user = this.userRepository.create({
      name,
      email,
      password: await bcryptjs.hash(password,15),
      rol
    });

    await this.userRepository.save(user);

    await this.mailerService.sendMail({
      to: email,
      subject: 'Bienvenido',
      text: `Tu contraseña es: ${password}`,
    });

    return user;

    // Enviar el correo con la contraseña generada automaticamente


  }

  async requestUserParent(createUserParentDto : RequestUserParentDto){
    
    const personId = createUserParentDto.personId
    const student  = await this.studentRepository.findOneBy({admission_number: createUserParentDto.admission_number })

    console.log(student, "student")

    if (!student) {
      return "Estudiante no encontrado";
    }

    if(personId){
      const person = await this.personRepository.findOneBy({id: personId }) 
      if (!person) 
        return "Persona no encontrada";

      if(person.account === "creado")
        return "Usted ya tiene una cuenta registrada en la App"
      
      const responsible = await this.responsibleRepository.findOne({
        where: {
          person: {id: personId}, 
          student: {id: student.id}
        }
      })

      if(!responsible){
        return "Ingrese datos correctos"
      }

      //Se actualiza el email y estado de la cuenta a creada de la persona y se crea el usuario
      const name = `${person.full_name} ${person.last_name}`
      // const user = await this.createUser(name, createUserParentDto.email, "padre");

      // Object.assign(person, {userId: user.id, email_addres: createUserParentDto.email, account: "creado"})
      
      Object.assign(person, {email_address: createUserParentDto.email, account: "solicitado"})
      await this.personRepository.save(person)

      return person
    }

    

    // Crear cuando es de tipo estudiante
    if(student.account === "creado")
      return "Usted ya tiene una cuenta registrada en la App"


    // const name = `${student.full_name} ${student.last_name}`
    // const user = await this.createUser(name, createUserParentDto.email, "estudiante");

    // Object.assign(student, {userId: user.id, email_addres: createUserParentDto.email, account: "creado"})

    const email= createUserParentDto.email;
    Object.assign(student, {email_address: email, account: "solicitado"})
    await this.studentRepository.save(student)

    return student
  }

  async createUserParent(createUserParentDto : CreateUserParentDto){
    
    const personId = createUserParentDto.personId
    const student  = await this.studentRepository.findOneBy({admission_number: createUserParentDto.admission_number })

    if (!student) {
      return "Estudiante no encontrado";
    }

    if(personId){
      const person = await this.personRepository.findOneBy({id: personId }) 
      if (!person) 
        return "Persona no encontrada";

      if(person.account === "creado")
        return "Usted ya tiene una cuenta registrada en la App"

      //Se actualiza el email y estado de la cuenta a creada de la persona y se crea el usuario
      const name = `${person.full_name} ${person.last_name}`
      const user = await this.createUser(name, createUserParentDto.email_address, "padre");

      Object.assign(person, {userId: user.id, email_address: createUserParentDto.email_address, account: "creado"})
      await this.personRepository.save(person)

      return person
    }

    // Crear cuando es de tipo estudiante
    if(student.account === "creado")
      return "Usted ya tiene una cuenta registrada en la App"

    const name = `${student.full_name} ${student.last_name}`
    const user = await this.createUser(name, createUserParentDto.email_address, "estudiante");

    Object.assign(student, {userId: user.id, email_address: createUserParentDto.email_address, account: "creado"})

    await this.studentRepository.save(student)

    return student
  }

  findByOneEmail(email: string){
    return this.userRepository.findOneBy({email})
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
