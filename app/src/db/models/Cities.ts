// // title,link,pubDate,content,content,guid,isoDate
// import { Entity, PrimaryGeneratedColumn, Column, Index, OneToMany, ManyToOne } from "typeorm";
// import { CovidCitiesAPI } from "./CovidCitiesAPI";
// import { Provinces } from "./Provinces";

// @Entity({ database: "default" })
// @Index(["name"])
// export class Cities {
//     @PrimaryGeneratedColumn("uuid")
//     city_id: string;

//     @ManyToOne((type) => Provinces, (provinces) => provinces.cities)
//     province: Provinces;

//     @OneToMany((type) => CovidCitiesAPI, (reports) => reports.city)
//     reports: CovidCitiesAPI[];

//     @Column({
//         type: "varchar",
//         length: 200,
//         nullable: true,
//         unique: false,
//     })
//     name: string;

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

// title,link,pubDate,content,content,guid,isoDate
import { Entity, PrimaryGeneratedColumn, Column, Index, OneToMany, ManyToOne } from "typeorm";
import { CovidCitiesAPI } from "./CovidCitiesAPI";
import { Province } from "./Provinces";

@Entity({ database: "default" })
@Index(["name"])
export class Cities {
    @PrimaryGeneratedColumn("uuid")
    city_id: string;

    @ManyToOne((type) => Province, (provinces) => provinces.cities)
    province: Province;

    @OneToMany((type) => CovidCitiesAPI, (reports) => reports.city)
    reports: CovidCitiesAPI[];

    @Column({
        type: "varchar",
        length: 200,
        nullable: true,
        unique: false,
    })
    name: string;

    @Column({
        type: "varchar",
        length: 20,
        nullable: true,
        unique: false,
    })
    iso: string;


    @Column({
        type: "float8",
        nullable: true,
        unique: false,
    })
    lat: number;

    @Column({
        type: "float8",
        nullable: true,
        unique: false,
    })
    long: number;
}
