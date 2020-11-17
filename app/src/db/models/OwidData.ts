import { Entity, Column, PrimaryGeneratedColumn, Index } from "typeorm";

@Entity({ database: "default" })
@Index(["Country", "symbol", "total_cases", "new_cases", "new_deaths"])
export class OwidData {
    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column({ unique: false })
    symbol: string;

    @Column({ nullable: true })
    Country: string;

    @Column({ nullable: true })
    Continent: string;

    @Column({ nullable: true, type: "date" })
    date: Date;

    @Column({ nullable: true, type: "int" })
    total_cases: number;

    @Column({ nullable: true, type: "int" })
    new_cases: number;

    @Column({ nullable: true, type: "int" })
    total_deaths: number;

    @Column({ nullable: true, type: "int" })
    new_deaths: number;

    @Column({ nullable: true, type: "int" })
    total_tests: number;

    @Column({ nullable: true, type: "int" })
    new_tests: number;
}
