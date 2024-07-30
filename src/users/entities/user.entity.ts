import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  //check this camp... is suspicious 
  @Column('varchar', { length: 255 ,unique: true, nullable: false})
  email: string;

  @Column('text', { nullable: false })
  password: string;

  @Column({default: 'user'})
  rol: string

  @CreateDateColumn()
  created_at: Date;

  @DeleteDateColumn()
  deleted_at: Date
}
