import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity({ database: 'default' })
@Index([
  'Country',
  'Infection_Risk',
  'Case_Fatality_Rate',
  'Test_Percentage',
  'Recovery_Proporation',
  'TotalCases',
  'NewCases',
  'TotalDeaths',
  'NewDeaths',
  'TotalRecovered',
  'NewRecovered',
  'ActiveCases',
  'TotalTests',
  'Population',
  'Serious_Critical',
])
export class Statistics {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ nullable: true })
  rank: number;

  @Column({ nullable: true })
  Country: string;

  @Column({ nullable: true })
  Continent: string;

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
  ThreeLetterSymbol: string;

  @Column({ nullable: true, type: 'float8', default: 0 })
  Infection_Risk: number;

  @Column({ nullable: true, type: 'float8', default: 0 })
  Case_Fatality_Rate: number;

  @Column({ nullable: true, type: 'float8', default: 0 })
  Test_Percentage: number;

  @Column({ nullable: true, type: 'float8', default: 0 })
  Recovery_Proporation: number;

  @Column({ nullable: true, type: 'float8', default: 0 })
  TotalCases: number;

  @Column({ nullable: true, type: 'float8', default: 0 })
  NewCases: number;

  @Column({ nullable: true, type: 'float8', default: 0 })
  TotalDeaths: number;

  @Column({ nullable: true, type: 'float8', default: 0 })
  NewDeaths: number;

  @Column({ nullable: true, type: 'float8', default: 0 })
  TotalRecovered: number;

  @Column({ nullable: true, type: 'float8', default: 0 })
  NewRecovered: number;

  @Column({ nullable: true, type: 'float8', default: 0 })
  ActiveCases: number;

  @Column({ nullable: true, type: 'float8', default: 0 })
  TotalTests: number;

  @Column({ nullable: true, type: 'float8', default: 0 })
  Population: number;

  @Column({ nullable: true, type: 'float8', default: 0 })
  one_Caseevery_X_ppl: number;

  @Column({ nullable: true, type: 'float8', default: 0 })
  one_Deathevery_X_ppl: number;

  @Column({ nullable: true, type: 'float8', default: 0 })
  one_Testevery_X_ppl: number;

  @Column({ nullable: true, type: 'float8', default: 0 })
  Deaths_1M_pop: number;

  @Column({ nullable: true, type: 'float8', default: 0 })
  Serious_Critical: number;

  @Column({ nullable: true, type: 'float8', default: 0 })
  Tests_1M_Pop: number;

  @Column({ nullable: true, type: 'float8', default: 0 })
  TotCases_1M_Pop: number;
}
