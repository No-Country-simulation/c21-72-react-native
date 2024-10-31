import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';
import { Repository, DataSource } from 'typeorm';
import { Person } from 'src/person/entities/person.entity';
import { Responsible } from 'src/responsible/entities/responsible.entity';
import { PersonService } from 'src/person/person.service';
import { UsersService } from 'src/users/users.service';
export declare class StudentService {
    private readonly studentRepository;
    private readonly personRepository;
    private readonly responsibleRepository;
    private personService;
    private userService;
    private dataSoruce;
    constructor(studentRepository: Repository<Student>, personRepository: Repository<Person>, responsibleRepository: Repository<Responsible>, personService: PersonService, userService: UsersService, dataSoruce: DataSource);
    create(createStudentDto: CreateStudentDto): Promise<Student>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateStudentDto: UpdateStudentDto): string;
    remove(id: number): string;
}
