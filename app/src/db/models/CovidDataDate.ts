import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, Index } from 'typeorm';
import { CovidData } from './CovidData';

@Entity({ database: 'default' })
@Index([
  'total_cases',
  'new_cases',
  'total_deaths',
  'new_deaths',
  'new_tests',
  'total_tests',
  'positive_rate',
])
export class CovidDataDate {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ManyToOne((type) => CovidData, (data) => data.data)
  symbol: CovidData;

  @Column({ nullable: true, type: 'date' })
  date: Date;

  @Column({ nullable: true, type: 'float8' })
  total_cases: number;

  @Column({ nullable: true, type: 'float4' })
  new_cases: number;

  @Column({ nullable: true, type: 'float4' })
  new_cases_smoothed: number;

  @Column({ nullable: true, type: 'float4' })
  total_deaths: number;

  @Column({ nullable: true, type: 'float4' })
  new_deaths: number;

  @Column({ nullable: true, type: 'float4' })
  new_deaths_smoothed: number;

  @Column({ nullable: true, type: 'float4' })
  total_cases_per_million: number;

  @Column({ nullable: true, type: 'float4' })
  new_cases_per_million: number;

  @Column({ nullable: true, type: 'float4' })
  new_cases_smoothed_per_million: number;

  @Column({ nullable: true, type: 'float4' })
  total_deaths_per_million: number;

  @Column({ nullable: true, type: 'float4' })
  new_deaths_per_million: number;

  @Column({ nullable: true, type: 'float4' })
  new_deaths_smoothed_per_million: number;

  @Column({ nullable: true, type: 'float4' })
  new_tests: number;

  @Column({ nullable: true, type: 'float4' })
  total_tests: number;

  @Column({ nullable: true, type: 'float4' })
  total_tests_per_thousand: number;

  @Column({ nullable: true, type: 'float4' })
  new_tests_smoothed: number;

  @Column({ nullable: true, type: 'float4' })
  new_tests_smoothed_per_thousand: number;

  @Column({ nullable: true, type: 'float4' })
  tests_per_case: number;

  @Column({ nullable: true, type: 'float4' })
  positive_rate: number;

  @Column({ nullable: true, type: 'float4' })
  stringency_index: number;

  @Column({ nullable: true })
  tests_units: string;
}
