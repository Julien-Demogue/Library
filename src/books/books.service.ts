import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';

@Injectable()
export class BooksService {
    constructor(@InjectRepository(Book) private repo: Repository<Book>){}

    async createBook(title:string, author:string){
        const book = this.repo.create(
            {
                title:title,
                author: author,
                rating: 0
            }
        )
        this.repo.save(book) 
    }

    findOne(id: number) {
        const book = this.repo.findOneBy({ id })
        if(!book){
            throw new Error('book not found with id: ' + id)
        }
        return book
    }

    findAll() {
        const books = this.repo.find({take:100})
        if(!books){
            throw new Error('No books found')
        }
        return books
    }
}
