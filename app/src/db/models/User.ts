import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

interface UserInterface {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
}

@Entity({ database: 'default' })
export class User implements UserInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;
}
