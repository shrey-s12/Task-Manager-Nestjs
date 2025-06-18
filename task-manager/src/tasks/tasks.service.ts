import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { AssignTaskDto } from './dto/assign-task.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task) private repo: Repository<Task>,
        private usersService: UsersService
    ) { }

    async findAll() {
        return this.repo.find({
            relations: ['assignedTo'],
            select: {
                id: true,
                title: true,
                description: true,
                status: true,
                assignedTo: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        });
    }

    async findAllForEmployee(employeeId: number) {
        return this.repo.find({
            where: { assignedTo: { id: employeeId } },
            relations: ['assignedTo'],
            select: {
                id: true,
                title: true,
                description: true,
                status: true,
                assignedTo: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        });
    }


    async assignTask(dto: AssignTaskDto) {
        const employee = await this.usersService.findById(dto.employeeId);
        if (!employee) throw new NotFoundException('Employee not found');
        const task = this.repo.create({
            title: dto.title,
            description: dto.description,
            assignedTo: employee,
        });
        return this.repo.save(task);
    }

    async updateStatus(id: number, dto: UpdateStatusDto, userId: number) {
        const task = await this.repo.findOne({ where: { id }, relations: ['assignedTo'] });
        if (!task) throw new NotFoundException('Task not found');
        if (task.assignedTo.id !== userId) throw new UnauthorizedException();
        task.status = dto.status;
        return this.repo.save(task);
    }
}
