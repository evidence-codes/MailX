import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Reminder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  recipientEmail: string;

  @Column()
  subject: string;

  @Column()
  body: string;

  @Column()
  scheduledTime: Date;

  @Column({ default: "pending" })
  status: string;
}
