import { CreateDirectorDto } from './dto/create-director.dto';
import { UpdateDirectorDto } from './dto/update-director.dto';
import { Person } from 'src/person/entities/person.entity';
import { Student } from 'src/student/entities/student.entity';
import { Repository } from 'typeorm';
export declare class DirectorService {
    private readonly personRepository;
    private readonly studentRepository;
    constructor(personRepository: Repository<Person>, studentRepository: Repository<Student>);
    create(createDirectorDto: CreateDirectorDto): string;
    accountFamily(offset?: number, limit?: number): Promise<Person[]>;
    accountStudent(offset?: number, limit?: number): Promise<Student[]>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateDirectorDto: UpdateDirectorDto): string;
    remove(id: number): string;
}
