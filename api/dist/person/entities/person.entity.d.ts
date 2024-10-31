import { Responsible } from "src/responsible/entities/responsible.entity";
import { User } from "src/users/entities/user.entity";
export declare class Person {
    id: number;
    full_name: string;
    last_name: string;
    email_address: string;
    address: string;
    male: string;
    account: string;
    user: User | null;
    userId?: number;
    deleteAt: Date;
    responsibles: Responsible[];
}
