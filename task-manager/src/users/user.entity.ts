import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Role } from '../common/enums/role.enum';
import { Task } from '../tasks/task.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ type: 'enum', enum: Role, default: Role.EMPLOYEE })
    role: Role;

    @OneToMany(() => Task, (task) => task.assignedTo)
    tasks: Task[];
}
