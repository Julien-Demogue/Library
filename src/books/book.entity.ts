import { AfterInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Book {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    author: string

    @Column()
    genre: string

    @Column()
    rating: number

    @AfterInsert()
    logInsert() {
        console.log('Book created with id ' + this.id)
    }
}