import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Book } from './books/book.entity';
import { BooksModule } from './books/books.module';
import { BorrowsModule } from './borrows/borrows.module';
import { Borrow } from './borrows/borrow.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User,Book,Borrow],
      synchronize: true
    }),
    UsersModule, BooksModule, BorrowsModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
