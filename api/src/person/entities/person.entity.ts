import { User } from "src/users/entities/user.entity";
import { Column, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn, Unique } from "typeorm";

@Entity()
export class Person {
    @PrimaryColumn()
    id: number;

    @Column()
    full_name: string;

    @Column()
    last_name: string;

    @Column({unique: true,nullable: false})
    email_address: string;

    @Column()
    address: string;

    @Column({nullable: false})
    male: string;

    @OneToOne(() => User, { nullable: true })
    @JoinColumn()
    user: User | null;

    @Column({ nullable: true })
    userId?: number;

    @DeleteDateColumn() // decorador para eliminar un usuario de forma logica
    deleteAt: Date;
}
