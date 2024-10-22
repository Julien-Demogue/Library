import { Body, Controller, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { BooksService } from './books.service';
import { SerializeInterceptor } from 'src/interceptors/serialize.interceptor';

@Controller('book')
export class BooksController {
    constructor(
        private booksService: BooksService,
    ){}

    @Post('/create')
    async createUser(@Body() body){
        return this.booksService.createBook(body.title, body.author);
    }

    @Get('/:id')
    @UseInterceptors(SerializeInterceptor)
    findById(@Param('id') id: number) {
        const book = this.booksService.findOne(id)
        return book
    }

    @Get('/all')
    findAll() {
        const books = this.booksService.findAll()
        return books
    }
}
