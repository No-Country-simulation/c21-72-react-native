import { Responsible } from "src/responsible/entities/responsible.entity";
import { User } from "src/users/entities/user.entity";
import { Column, DeleteDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn, Unique } from "typeorm";

@Entity()
export class Person {
    @PrimaryColumn()
    id: number;

    @Column()
    full_name: string;

    @Column()
    last_name: string;

    @Column({unique: true, nullable: true})
    email_address: string;

    @Column()
    address: string;

    @Column({nullable: false})
    male: string;

    @Column({default: 'pendiente'}) // solicitado, creado // para saber si una familiar esta solicitando una cuenta
    account: string;

    @OneToOne(() => User, { nullable: true })
    @JoinColumn()
    user: User | null;

    @Column({ nullable: true })
    userId?: number;

    @DeleteDateColumn() // decorador para eliminar un usuario de forma logica
    deleteAt: Date;

    @OneToMany(() => Responsible, (studentPerson) => studentPerson.person)
    responsibles: Responsible[];

}
