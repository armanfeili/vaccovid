// // title,link,pubDate,content,content,guid,isoDate
// import { Entity, PrimaryGeneratedColumn, Column, Index, OneToMany, ManyToOne } from "typeorm";
// import { Cities } from "./Cities";
// // import { Countries } from "./Countries";
// import { CovidProvincesAPI } from "./CovidProvincesAPI";
// // import { ProvincesCovidReports } from "./ProvincesCovidReports";
// //
// @Entity({ database: "default" })
// @Index(["name", "iso"])
// export class Provinces {
//     @PrimaryGeneratedColumn("uuid")
//     province_id: string;

//     // @ManyToOne((type) => Countries, (countries) => countries.province)
//     // country: Countries;

//     @OneToMany((type) => Cities, (cities) => cities.province)
//     cities: Cities[];

//     @OneToMany((type) => CovidProvincesAPI, (reports) => reports.province)
//     reports: CovidProvincesAPI[];

//     @Column({
//         type: "varchar",
//         length: 200,
//         nullable: true,
//         unique: false,
//     })
//     name: string;

//     @Column({
//         type: "varchar",
//         length: 200,
//         nullable: true,
//         unique: false,
//     })
//     province: string;

//     @Column({
//         type: "varchar",
//         length: 20,
//         nullable: true,
//         unique: false,
//     })
//     TwoLetterSymbol: string;

//     @Column({
//         type: "varchar",
//         length: 20,
//         nullable: true,
//         unique: false,
//     })
//     iso: string;

//     @Column({
//         type: "float",
//         nullable: true,
//         unique: false,
//     })
//     lat: number;

//     @Column({
//         type: "float",
//         nullable: true,
//         unique: false,
//     })
//     long: number;
// }

// title,link,pubDate,content,content,guid,isoDate
import { Entity, PrimaryGeneratedColumn, Column, Index, OneToMany, TreeChildren } from "typeorm";
// import { Cities } from "./Cities";
import { CovidProvincesAPI } from "./CovidProvincesAPI";
// import { ProvincesCovidReports } from "./ProvincesCovidReports";
//
@Entity({ database: "default" })
@Index(["name", "iso"])
export class Province {
    @PrimaryGeneratedColumn("uuid")
    province_id: string;

    // @Oneciti

    // @OneToMany((type) => Cities, (cities) => cities.province)
    // cities: Cities[];

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
