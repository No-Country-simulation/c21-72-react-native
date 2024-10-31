import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserParentDto } from './dto/create-user-parent.dto';
import { RequestUserParentDto } from './dto/request-user-parent.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<CreateUserDto & import("./entities/user.entity").User>;
    requestParent(requestUserParentDto: RequestUserParentDto): Promise<import("../person/entities/person.entity").Person | import("../student/entities/student.entity").Student | "Estudiante no encontrado" | "Persona no encontrada" | "Usted ya tiene una cuenta registrada en la App" | "Ingrese datos correctos">;
    createParent(createUserParentDto: CreateUserParentDto): Promise<import("../person/entities/person.entity").Person | import("../student/entities/student.entity").Student | "Estudiante no encontrado" | "Persona no encontrada" | "Usted ya tiene una cuenta registrada en la App">;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateUserDto: UpdateUserDto): string;
    remove(id: string): string;
}
