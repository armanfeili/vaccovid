// // title,link,pubDate,content,content,guid,isoDate
// import { Entity, PrimaryGeneratedColumn, Column, Index, Tree, ManyToOne } from "typeorm";

// import { Provinces } from "./Provinces";

// @Entity({ database: "default" })
// @Index(["date", "province", "confirmed", "recovered", "deaths", "confirmed_diff", "deaths_diff", "recovered_diff", "active", "fatality_rate"])
// export class CovidProvincesAPI {
//     @PrimaryGeneratedColumn("uuid")
//     CovidProvincesAPI_id: string;

//     @ManyToOne((type) => Provinces, (province) => province.reports)

//     province: Provinces;

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

// title,link,pubDate,content,content,guid,isoDate
import {
    Entity, PrimaryGeneratedColumn, Column,
    Index,
    // Tree,
    ManyToOne
} from "typeorm";

import { Province } from "./Provinces";

@Entity({ database: "default" })
@Index([
    "confirmed",
    "deaths",
    "fatality_rate",
])
export class CovidProvincesAPI {
    @PrimaryGeneratedColumn("uuid")
    CovidProvincesAPI_id: string;

    @ManyToOne((type) => Province, (provinces) => provinces.reports)
    province: Province;

    @Column({
        type: "date",
        nullable: false,
        unique: false,
    })
    date: Date;

    @Column({
        type: "int4",
        nullable: true,
        unique: false,
    })
    confirmed: number;

    @Column({
        type: "int4",
        nullable: true,
        unique: false,
    })
    recovered: number;

    @Column({
        type: "int4",
        nullable: true,
        unique: false,
    })
    deaths: number;

    @Column({ nullable: true, type: "float", default: 0 })
    Case_Fatality_Rate: number;

    @Column({ nullable: true, type: "float", default: 0 })
    Recovery_Proporation: number;

    @Column({
        type: "int4",
        nullable: true,
        unique: false,
    })
    confirmed_diff: number;

    @Column({
        type: "int4",
        nullable: true,
        unique: false,
    })
    deaths_diff: number;

    @Column({
        type: "int4",
        nullable: true,
        unique: false,
    })
    recovered_diff: number;

    @Column({
        type: "int4",
        nullable: true,
        unique: false,
    })
    active: number;

    @Column({
        type: "int4",
        nullable: true,
        unique: false,
    })
    active_diff: number;

    @Column({
        type: "float",
        nullable: true,
        unique: false,
    })
    fatality_rate: number;
}
