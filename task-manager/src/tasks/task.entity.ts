import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';
import { TaskStatus } from '../common/enums/task-status.enum';

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.PENDING })
    status: TaskStatus;

    @ManyToOne(() => User, (user) => user.tasks)
    assignedTo: User;

    @Column({ nullable: true }) // 👈 Add this
    assignedToId: number;
}
