import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Borrow } from './borrow.entity';

@Injectable()
export class BorrowsService {
    constructor(@InjectRepository(Borrow) private repo: Repository<Borrow>){}

    async createBorrow(bookId:number, userId:number){
        const borrow = this.repo.create(
            {
                bookId: bookId,
                userId: userId,
                dateBorrow: new Date()
            }
        )
        this.repo.save(borrow) 
    }

    findOne(id: number) {
        const borrow = this.repo.findOneBy({ id })
        if(!borrow){
            throw new Error('borrow not found with id: ' + id)
        }
        return borrow
    }

    findAll() {
        const borrows = this.repo.find({take:100})
        if(!borrows){
            throw new Error('No borrows found')
        }
        return borrows
    }
}
