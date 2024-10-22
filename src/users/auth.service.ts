import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { promisify } from "util";
import { randomBytes, scrypt as _scrypt } from 'crypto';
const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService){}

    async signup(email: string, password: string) {
        const user = await this.usersService.findOneByEmail(email)

        if (user) {
            throw new BadRequestException('email in use')
        }
    
        const salt = randomBytes(8).toString('hex')
        const hash = (await scrypt(password, salt, 32)) as Buffer 
        const result = salt + '.' + hash.toString('hex')
        const newUser = this.usersService.createUser(email, result)
        return newUser
    }

    async signin(email:string, password:string){
        const user = await this.usersService.findOneByEmail(email)

        if (user) {
            throw new NotFoundException('User not found')
        }

        const [salt,storedHash] = user.password.split('.')
        const hash = (await scrypt(password,salt, 32)) as Buffer
        
        if(storedHash !== hash.toString('hex')){
            throw new NotFoundException('Email or password incorrect')
        }

        return user
    }
}