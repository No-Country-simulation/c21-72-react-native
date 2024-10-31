import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Person } from './entities/person.entity';
import { EntityManager, Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { TeacherService } from 'src/teacher/teacher.service';
import { FamilyMemberDto } from 'src/student/dto/create-student.dto';
export declare class PersonService {
    private readonly personRepository;
    private userService;
    private teacherService;
    mailerService: any;
    constructor(personRepository: Repository<Person>, userService: UsersService, teacherService: TeacherService);
    create({ personId, full_name, last_name, email_address, address, male, deleteAt, type }: CreatePersonDto): Promise<{
        id: number;
        personId: number;
        address: string;
        deleteAt: Date;
        email_address: string;
        full_name: string;
        last_name: string;
        male: string;
    } | {
        person: Person;
        status: number;
        message: string;
    }>;
    createFamily({ personId, full_name, last_name, email_address, address, male }: FamilyMemberDto, manager: EntityManager): Promise<Person>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updatePersonDto: UpdatePersonDto): string;
    remove(id: number): string;
}
