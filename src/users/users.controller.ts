import { Body, Controller, Get, NotFoundException, Param, Post, Query, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create.dto';
import { GetUserDto } from './dto/get.dto';
import { SerializeInterceptor } from 'src/interceptors/serialize.interceptor';

@Controller('auth')
export class UsersController {
    constructor(
        private usersService: UsersService,
        private authService: AuthService
    ){}

    @Post('/signup')
    async createUser(@Body() body:CreateUserDto){
        return this.authService.signup(body.email, body.password);
    }

    @Get('/signin')
    @UseInterceptors(SerializeInterceptor)
    async findUser(@Body() body:GetUserDto){
        return this.authService.signin(body.email, body.password);
    }

    @Get('/:id')
    @UseInterceptors(SerializeInterceptor)
    findById(@Param('id') id: number) {
        const user = this.usersService.findOne(id)
        return user
    }

    @Get()
    async findByEmail(@Query('email') email: string) {
        const user = await this.usersService.findOneByEmail(email);
        if (!user) {
        throw new NotFoundException(`User with email ${email} not found.`);
        }
        return user;
    }

    @Get('/all')
    findAll() {
        const users = this.usersService.findAll()
        return users
    }
}
