// // title,link,pubDate,content,content,guid,isoDate
// import { Entity, PrimaryGeneratedColumn, Column, Index, OneToMany, TreeChildren } from "typeorm";
// import { Provinces } from "./Provinces";
// import { CovidCountriesAPI } from "./CovidCountriesAPI";
// // import { ProvincesCovidReports } from "./ProvincesCovidReports";
// //
// @Entity({ database: "default" })
// @Index(["name", "iso"])
// export class Countries {
//     @PrimaryGeneratedColumn("uuid")
//     countries_id: string;

//     // @Oneciti

//     @OneToMany((type) => Provinces, (provinces) => provinces.country)
//     provinces: Provinces[];

//     @OneToMany((type) => CovidCountriesAPI, (reports) => reports.country)
//     reports: CovidCountriesAPI[];

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
//         type: "float8",
//         nullable: true,
//         unique: false,
//     })
//     lat: number;

//     @Column({
//         type: "float8",
//         nullable: true,
//         unique: false,
//     })
//     long: number;
// }
