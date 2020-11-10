import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Index } from "typeorm";
import { CovidDataDate } from "./CovidDataDate";

@Entity({ database: "default" })
@Index(["Country", "population", "symbol"])
export class CovidData {
    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column({ unique: true })
    symbol: string;

    @Column({ nullable: true })
    Country: string;

    @Column({ nullable: true })
    Continent: string;

    @Column({ nullable: true, type: "float8" })
    population: number;

    @OneToMany((type) => CovidDataDate, (data) => data.symbol)
    data: CovidDataDate[];
}
