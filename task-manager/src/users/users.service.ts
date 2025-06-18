import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Role } from 'src/common/enums/role.enum';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User>) { }

    create(userData: Partial<User>) {
        const user = this.repo.create(userData);
        return this.repo.save(user);
    }

    async findByRole(role: Role) {
        return this.repo.find({ where: { role }, select: ['id', 'name', 'email'] });
    }

    findByEmail(email: string) {
        return this.repo.findOne({ where: { email } });
    }

    findById(id: number) {
        return this.repo.findOne({ where: { id } });
    }
}
