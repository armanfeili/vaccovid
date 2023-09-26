import {
    Entity, PrimaryGeneratedColumn, Column,
    Index,
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
