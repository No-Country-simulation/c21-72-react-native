import { Person } from "src/person/entities/person.entity";
import { Student } from "src/student/entities/student.entity";
import { Column, DeleteDateColumn, Entity, JoinColumn, OneToOne } from "typeorm";

@Entity()
export class User {
    @Column({primary: true, generated: true})
    id: number;

    @Column()
    name: string;

    @Column({unique: true, nullable: false})
    email: string;

    @Column({nullable: false})
    password: string;

    @Column({default: 'user'})
    rol: string;

    @OneToOne(() => Person, person => person.user, { nullable: true })
    person: Person;

    @OneToOne(() => Student, student => student.user, { nullable: true })
    user: User;

    @DeleteDateColumn() // decorador para eliminar un usuario de forma logica
    deleteAt: Date;
}
