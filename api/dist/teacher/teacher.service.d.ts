import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { Teacher } from './entities/teacher.entity';
import { Repository } from 'typeorm';
export declare class TeacherService {
    private readonly teacherRepository;
    constructor(teacherRepository: Repository<Teacher>);
    create(personId: number): Promise<Teacher>;
    findAll(offset?: number, limit?: number): Promise<Teacher[]>;
    findOne(id: number): Promise<string | {
        id: number;
        personId: number;
        address: string;
        deleteAt: Date;
        email_address: string;
        full_name: string;
        last_name: string;
        male: string;
    }>;
    update(id: number, updateTeacherDto: UpdateTeacherDto): string;
    remove(id: number): string;
}
