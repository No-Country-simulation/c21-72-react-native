import { ResponsibleService } from './responsible.service';
import { CreateResponsibleDto } from './dto/create-responsible.dto';
import { UpdateResponsibleDto } from './dto/update-responsible.dto';
export declare class ResponsibleController {
    private readonly responsibleService;
    constructor(responsibleService: ResponsibleService);
    create(createResponsibleDto: CreateResponsibleDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateResponsibleDto: UpdateResponsibleDto): string;
    remove(id: string): string;
}
