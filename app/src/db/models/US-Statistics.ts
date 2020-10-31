import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ database: 'default' })
export class USStatistics {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({
        type: "varchar",
        length: 50,
        nullable: false,
        unique: false
    })
    USAState: string;


    @Column({ nullable: false, type: 'int', default: 0 })
    TotalCases: number;

    @Column({ nullable: false, type: 'int', default: 0 })
    NewCases: number;

    @Column({ nullable: false, type: 'int', default: 0 })
    TotalDeaths: number;

    @Column({ nullable: false, type: 'int', default: 0 })
    NewDeaths: number;

    @Column({ nullable: false, type: 'int', default: 0 })
    ActiveCases: number;

}
