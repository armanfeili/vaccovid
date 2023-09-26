// title,link,pubDate,content,content,guid,isoDate
import { Entity, PrimaryGeneratedColumn, Column, Index, OneToMany, TreeChildren } from "typeorm";
import { CovidProvincesAPI } from "./CovidProvincesAPI";
@Entity({ database: "default" })
@Index(["name", "iso"])
export class Province {
    @PrimaryGeneratedColumn("uuid")
    province_id: string;

    @OneToMany((type) => CovidProvincesAPI, (reports) => reports.province)
    reports: CovidProvincesAPI[];

    @Column({
        type: "varchar",
        length: 200,
        nullable: true,
        unique: false,
    })
    name: string;

    @Column({
        type: "varchar",
        length: 200,
        nullable: true,
        unique: false,
    })
    province: string;

    @Column({
        type: "varchar",
        length: 20,
        nullable: true,
        unique: false,
    })
    TwoLetterSymbol: string;

    @Column({
        type: "varchar",
        length: 20,
        nullable: true,
        unique: false,
    })
    iso: string;

    @Column({
        type: "float",
        nullable: true,
        unique: false,
    })
    lat: number;

    @Column({
        type: "float",
        nullable: true,
        unique: false,
    })
    long: number;
}
