// // title,link,pubDate,content,content,guid,isoDate
// import { Entity, PrimaryGeneratedColumn, Column, Index, Tree, ManyToOne } from "typeorm";
// import { Countries } from "./Countries";

// @Entity({ database: "default" })
// @Index(["date", "province", "confirmed", "recovered", "deaths", "confirmed_diff", "deaths_diff", "recovered_diff", "active", "fatality_rate"])
// export class CovidCountriesAPI {
//     @PrimaryGeneratedColumn("uuid")
//     CovidCountriesAPI_id: string;

//     @ManyToOne((type) => Countries, (countries) => countries.reports)
//     country: Countries;

//     @Column({
//         type: "date",
//         nullable: false,
//         unique: false,
//     })
//     date: Date;

//     @Column({
//         type: "int4",
//         nullable: true,
//         unique: false,
//     })
//     confirmed: number;

//     @Column({
//         type: "int4",
//         nullable: true,
//         unique: false,
//     })
//     recovered: number;

//     @Column({
//         type: "int4",
//         nullable: true,
//         unique: false,
//     })
//     deaths: number;

//     @Column({
//         type: "int4",
//         nullable: true,
//         unique: false,
//     })
//     confirmed_diff: number;

//     @Column({
//         type: "int4",
//         nullable: true,
//         unique: false,
//     })
//     deaths_diff: number;

//     @Column({
//         type: "int4",
//         nullable: true,
//         unique: false,
//     })
//     recovered_diff: number;

//     @Column({
//         type: "int4",
//         nullable: true,
//         unique: false,
//     })
//     active: number;

//     @Column({
//         type: "int4",
//         nullable: true,
//         unique: false,
//     })
//     active_diff: number;

//     @Column({
//         type: "float4",
//         nullable: true,
//         unique: false,
//     })
//     fatality_rate: number;
// }
