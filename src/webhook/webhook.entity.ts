import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Webhook {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'jsonb' })
  headers: any;

  @Column({ type: 'jsonb' })
  body: any;

  @CreateDateColumn()
  receivedAt: Date;
}
