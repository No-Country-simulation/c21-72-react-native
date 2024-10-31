import { CreateResponsibleDto } from './dto/create-responsible.dto';
import { UpdateResponsibleDto } from './dto/update-responsible.dto';
export declare class ResponsibleService {
    create(createResponsibleDto: CreateResponsibleDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateResponsibleDto: UpdateResponsibleDto): string;
    remove(id: number): string;
}
