// title,link,pubDate,content,content,guid,isoDate
import { Entity, PrimaryGeneratedColumn, Column, Index, ManyToOne, Tree, TreeParent } from "typeorm";
import { Cities } from "./Cities";

@Entity({ database: "default" })
@Index(["date", "city", "confirmed", "deaths", "confirmed_diff", "deaths_diff"])
export class CovidCitiesAPI {
    @PrimaryGeneratedColumn("uuid")
    CovidCitiesAPI_id: string;

    @ManyToOne((type) => Cities, (cities) => cities.reports)
    city: Cities;

    @Column({
        type: "date",
        nullable: false,
        unique: false,
    })
    date: Date;

    @Column({
        type: "int8",
        nullable: true,
        unique: false,
    })
    confirmed: number;

    @Column({
        type: "int8",
        nullable: true,
        unique: false,
    })
    deaths: number;

    @Column({
        type: "int8",
        nullable: true,
        unique: false,
    })
    confirmed_diff: number;

    @Column({
        type: "int8",
        nullable: true,
        unique: false,
    })
    deaths_diff: number;
}
