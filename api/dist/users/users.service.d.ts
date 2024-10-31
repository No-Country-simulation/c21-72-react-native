import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { MailerService } from '@nestjs-modules/mailer';
import { CreateUserParentDto } from './dto/create-user-parent.dto';
import { Person } from 'src/person/entities/person.entity';
import { Responsible } from 'src/responsible/entities/responsible.entity';
import { Student } from 'src/student/entities/student.entity';
import { RequestUserParentDto } from './dto/request-user-parent.dto';
export declare class UsersService {
    private readonly userRepository;
    private readonly personRepository;
    private readonly studentRepository;
    private readonly responsibleRepository;
    private readonly mailerService;
    constructor(userRepository: Repository<User>, personRepository: Repository<Person>, studentRepository: Repository<Student>, responsibleRepository: Repository<Responsible>, mailerService: MailerService);
    createAdminIfNotExists(): Promise<void>;
    create(createUserDto: CreateUserDto): Promise<CreateUserDto & User>;
    createUser(name: string, email: string, rol: string): Promise<User>;
    requestUserParent(createUserParentDto: RequestUserParentDto): Promise<Person | Student | "Estudiante no encontrado" | "Persona no encontrada" | "Usted ya tiene una cuenta registrada en la App" | "Ingrese datos correctos">;
    createUserParent(createUserParentDto: CreateUserParentDto): Promise<Person | Student | "Estudiante no encontrado" | "Persona no encontrada" | "Usted ya tiene una cuenta registrada en la App">;
    findByOneEmail(email: string): Promise<User>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateUserDto: UpdateUserDto): string;
    remove(id: number): string;
}
