import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, Index } from "typeorm";
import { CovidData } from "./CovidData";

@Entity({ database: "default" })
@Index(["total_cases", "new_cases", "total_deaths", "new_deaths", "new_tests", "total_tests"])
export class CovidDataDate {
    @PrimaryGeneratedColumn("uuid")
    id: number;

    @ManyToOne((type) => CovidData, (data) => data.data)
    symbol: CovidData;

    @Column({ nullable: true, type: "date" })
    date: Date;

    @Column({ nullable: true, type: "float" })
    total_cases: number;

    @Column({ nullable: true, type: "float" })
    new_cases: number;

    @Column({ nullable: true, type: "float" })
    total_deaths: number;

    @Column({ nullable: true, type: "float" })
    new_deaths: number;

    @Column({ nullable: true, type: "float" })
    new_tests: number;

    @Column({ nullable: true, type: "float" })
    total_tests: number;
}
