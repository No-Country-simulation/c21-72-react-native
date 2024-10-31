import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
export declare class PersonController {
    private readonly personService;
    constructor(personService: PersonService);
    create(createPersonDto: CreatePersonDto): Promise<{
        id: number;
        personId: number;
        address: string;
        deleteAt: Date;
        email_address: string;
        full_name: string;
        last_name: string;
        male: string;
    } | {
        person: import("./entities/person.entity").Person;
        status: number;
        message: string;
    }>;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updatePersonDto: UpdatePersonDto): string;
    remove(id: string): string;
}
