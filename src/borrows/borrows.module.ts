import { Module } from '@nestjs/common';
import { BorrowsService } from './borrows.service';
import { BorrowsController } from './borrows.controller';
import { Borrow } from './borrow.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Borrow])],
  providers: [BorrowsService],
  controllers: [BorrowsController]
})
export class BorrowsModule {}
