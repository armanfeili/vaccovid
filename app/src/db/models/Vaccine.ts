// title,link,pubDate,content,content,guid,isoDate
import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm";

@Entity({ database: 'default' })
@Index(['developerResearcher', 'funder', 'lastUpdated', 'phase'])
export class Vaccine {
    @PrimaryGeneratedColumn("uuid")
    vaccine_id: number;

    @Column({
        type: "text",
        nullable: true,
        unique: false,
    })
    developerResearcher: string;

    @Column({
        type: "text",
        nullable: true,
        unique: false,
    })
    trimedName: string;

    @Column({
        type: "varchar",
        length: 50,
        nullable: false,
        unique: false,
    })
    treatmentVsVaccine: string;

    @Column({
        type: "varchar",
        length: 200,
        nullable: false,
        unique: false,
    })
    category: string;

    @Column({
        type: "varchar",
        length: 200,
        nullable: false,
        unique: false,
    })
    trimedCategory: string;

    @Column({
        type: "varchar",
        length: 50,
        nullable: false,
        unique: false,
    })
    phase: string;

    @Column({
        type: "text",
        nullable: true,
        unique: false,
    })
    nextSteps: string;

    @Column({
        type: 'text',
        nullable: true,
        unique: false,
    })
    description: string;

    @Column({
        type: 'text',
        nullable: true,
        unique: false,
    })
    clinicalTrialsForCovid19: string;

    @Column({
        type: 'text',
        nullable: true,
        unique: false,
    })
    funder: string;

    @Column({
        type: 'simple-array',
        nullable: true,
        default: "https://docs.google.com/document/d/1Y4nCJJ4njzD1wiHbufCY6gqfRmj49Qn_qNgOJD62Wik/edit",
        unique: false,
    })
    publishedResults: string[];

    @Column({
        type: 'text',
        nullable: true,
        unique: false,
    })
    clinicalTrialsForOtherDiseases: string;

    @Column({
        type: 'text',
        nullable: true,
        unique: false,
    })
    FDAApproved: string;

    @Column({
        type: 'timestamp',
        nullable: false,
    })
    lastUpdated: Date;
}
