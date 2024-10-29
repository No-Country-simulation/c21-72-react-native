import { Person } from "src/person/entities/person.entity";
import { Student } from "src/student/entities/student.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Responsible {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Student, (student) => student.responsibles)
    @JoinColumn({name: 'studentId'})
    student: Student;

    @ManyToOne(()=> Person, (person) => person.responsibles)
    @JoinColumn({name: 'personId'})
    person: Person;

    @Column()
    type: string;
}
