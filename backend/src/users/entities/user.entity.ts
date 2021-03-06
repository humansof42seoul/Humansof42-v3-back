import { IsDate, IsEmail, IsNumber, IsString } from "class-validator";
import { Comment } from "src/comments/entities/comment.entity";
import { Like } from "src/likes/entities/like.entity";
import { Post } from "src/posts/entities/post.entity";
import { Scrap } from "src/scraps/entities/scrap.entity";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from "typeorm";
import { userRole } from "../utils/types";

@Entity()
@Unique(["email", "nickname"])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @IsNumber()
  id!: number;

  @Column()
  @IsEmail()
  email!: string;

  @Column()
  @IsString()
  nickname!: string;

  @Column()
  @IsString()
  profile?: string;

  @Column()
  @IsString()
  role!: userRole;

  @Column()
  @IsString()
  password!: string;

  @CreateDateColumn()
  @IsDate()
  created_at!: Date;

  @UpdateDateColumn()
  @IsDate()
  modified_at!: Date;

  @DeleteDateColumn()
  @IsDate()
  deleted_at?: Date;

  @OneToMany(() => Post, (post) => post.id)
  posts: Post[];

  @OneToMany(() => Comment, (comments) => comments.id)
  comments: Comment[];

  @OneToMany(() => Like, (likes) => likes.id)
  likes: Like[];

  @OneToMany(() => Scrap, (scraps) => scraps.id)
  scraps: Scrap[];
}
