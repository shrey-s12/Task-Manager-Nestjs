import { Body, Controller, Get, Post, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { JwtAuthGuard } from './jwt.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private usersService: UsersService) { }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        const user = req.user;
        return {
            id: user.userId,
            name: user.name,
            email: user.email,
            role: user.role,
        };
    }

    @UseGuards(JwtAuthGuard)
    @Post('logout')
    logout(@Request() req) {
        return { message: 'Logged out successfully' };
    }

    @Post('register')
    async register(@Body() dto: RegisterDto) {
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        return this.usersService.create({
            ...dto,
            password: hashedPassword,
        });
    }

    @Post('login')
    async login(@Body() dto: LoginDto) {
        const user = await this.authService.validateUser(dto.email, dto.password);

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        return this.authService.login(user);
    }
}
