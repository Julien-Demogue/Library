import { Body, Controller, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { BorrowsService } from './borrows.service';
import { SerializeInterceptor } from 'src/interceptors/serialize.interceptor';

@Controller('borrow')
export class BorrowsController {
    constructor(
        private borrowsService: BorrowsService,
    ){}

    @Post('/create')
    async createUser(@Body() body){
        return this.borrowsService.createBorrow(body.bookId, body.userId);
    }

    @Get('/:id')
    @UseInterceptors(SerializeInterceptor)
    findById(@Param('id') id: number) {
        const user = this.borrowsService.findOne(id)
        return user
    }

    @Get('/all')
    findAll() {
        const users = this.borrowsService.findAll()
        return users
    }
}
