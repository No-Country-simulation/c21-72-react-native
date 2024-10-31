import { DirectorService } from './director.service';
import { CreateDirectorDto } from './dto/create-director.dto';
import { UpdateDirectorDto } from './dto/update-director.dto';
export declare class DirectorController {
    private readonly directorService;
    constructor(directorService: DirectorService);
    create(createDirectorDto: CreateDirectorDto): string;
    accountFamily(offset: string, limit: string): Promise<import("../person/entities/person.entity").Person[]>;
    accountStudent(offset: string, limit: string): Promise<import("../student/entities/student.entity").Student[]>;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateDirectorDto: UpdateDirectorDto): string;
    remove(id: string): string;
}
