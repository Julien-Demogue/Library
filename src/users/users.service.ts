import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User>){}

    async createUser(email:string,password:string){
        const user = this.repo.create(
            {
                email: email,
                password: password
            }
        )
        this.repo.save(user) 
    }

    findOne(id: number) {
        const user = this.repo.findOneBy({ id })
        if(!user){
            throw new Error('User not found with id: ' + id)
        }
        return user
    }

    async findOneByEmail(email: string) {
        return await this.repo.findOneBy({ email });
    }

    findAll() {
        const users = this.repo.find({take:100})
        if(!users){
            throw new Error('No users found')
        }
        return users
    }
}
