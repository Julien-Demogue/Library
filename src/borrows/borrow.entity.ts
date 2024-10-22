import { AfterInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Borrow {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    bookId: number

    @Column()
    userId: number

    @Column()
    dateBorrow: Date

    @Column()
    dateReturn: Date | null

    @AfterInsert()
    logInsert() {
        console.log('Borrow created with id ' + this.id)
    }
}