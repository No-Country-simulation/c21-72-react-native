import { Responsible } from "src/responsible/entities/responsible.entity";
import { User } from "src/users/entities/user.entity";
export declare class Student {
    id: number;
    full_name: string;
    last_name: string;
    admission_number: string;
    academic_year: number;
    date_of_admission: Date;
    email_address?: string;
    address: string;
    grado: string;
    salon: string;
    account: string;
    user: User | null;
    userId?: number;
    responsibles: Responsible[];
}
