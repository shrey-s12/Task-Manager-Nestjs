import { Controller, Post, Body, UseGuards, Request, Patch, Param, ParseIntPipe, Get, ForbiddenException } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';
import { AssignTaskDto } from './dto/assign-task.dto';
import { UpdateStatusDto } from './dto/update-status.dto';

@Controller('tasks')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TasksController {
    constructor(private tasksService: TasksService) { }

    @Get()
    @Roles(Role.MANAGER, Role.EMPLOYEE)
    getAllTasks(@Request() req) {
        const { role, userId } = req.user;

        switch (role) {
            case Role.MANAGER:
                return this.tasksService.findAll();
            case Role.EMPLOYEE:
                return this.tasksService.findAllForEmployee(userId);
            default:
                throw new ForbiddenException('Access denied');
        }
    }

    @Post('assign')
    @Roles(Role.MANAGER)
    assignTask(@Body() dto: AssignTaskDto) {
        return this.tasksService.assignTask(dto);
    }

    @Patch('update-status/:id')
    @Roles(Role.EMPLOYEE)
    updateStatus(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateStatusDto, @Request() req) {
        return this.tasksService.updateStatus(id, dto, req.user.userId);
    }
}
