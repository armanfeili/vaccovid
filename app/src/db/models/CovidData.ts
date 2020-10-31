import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Index } from 'typeorm';
import { CovidDataDate } from './CovidDataDate';

@Entity({ database: 'default' })
@Index([
  'Country',
  'population',
  'gdp_per_capita',
  'cardiovasc_death_rate',
  'diabetes_prevalence',
  'female_smokers',
  'male_smokers',
  'hospital_beds_per_thousand',
  'life_expectancy',
])
export class CovidData {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ unique: true })
  symbol: string;

  @Column({ nullable: true })
  Country: string;

  @Column({ nullable: true })
  Continent: string;

  @Column({ nullable: true, type: 'float8' })
  population: number;

  @Column({ nullable: true, type: 'float8' })
  population_density: number;

  @Column({ nullable: true, type: 'float' })
  median_age: number;

  @Column({ nullable: true, type: 'float' })
  aged_65_older: number;

  @Column({ nullable: true, type: 'float' })
  aged_70_older: number;

  @Column({ nullable: true, type: 'float8' })
  gdp_per_capita: number;

  @Column({ nullable: true, type: 'float8' })
  cardiovasc_death_rate: number;

  @Column({ nullable: true, type: 'float8' })
  diabetes_prevalence: number;

  @Column({ nullable: true, type: 'float' })
  female_smokers: number;

  @Column({ nullable: true, type: 'float' })
  male_smokers: number;

  @Column({ nullable: true, type: 'float' })
  hospital_beds_per_thousand: number;

  @Column({ nullable: true, type: 'float8' })
  life_expectancy: number;

  @OneToMany((type) => CovidDataDate, (data) => data.symbol)
  data: CovidDataDate[];
}
