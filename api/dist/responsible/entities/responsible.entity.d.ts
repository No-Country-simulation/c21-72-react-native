import { Person } from "src/person/entities/person.entity";
import { Student } from "src/student/entities/student.entity";
export declare class Responsible {
    id: number;
    student: Student;
    person: Person;
    type: string;
}
