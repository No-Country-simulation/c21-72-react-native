import { Person } from "src/person/entities/person.entity";
export declare class User {
    id: number;
    name: string;
    email: string;
    password: string;
    rol: string;
    person: Person;
    user: User;
    deleteAt: Date;
}
