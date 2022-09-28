import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  source: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: false })
  sum: number;

  @CreateDateColumn({ type: 'timestamptz' })
  date: Date;
}
