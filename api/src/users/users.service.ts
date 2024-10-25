import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { randomBytes } from 'crypto';
import { MailerService } from '@nestjs-modules/mailer';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly mailerService: MailerService,
  ){}

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
