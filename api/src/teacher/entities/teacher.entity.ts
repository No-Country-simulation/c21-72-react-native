import { Person } from "src/person/entities/person.entity";
import { Column, DeleteDateColumn, Entity, JoinColumn, OneToOne } from "typeorm";

@Entity()
export class Teacher {
    @Column({primary: true, generated: true})
    id: number;

    @OneToOne(() => Person, {nullable: true})
    @JoinColumn()
    person:Person | null ;

    @DeleteDateColumn() // decorador para eliminar un usuario de forma logica
    deleteAt: Date;    
}
