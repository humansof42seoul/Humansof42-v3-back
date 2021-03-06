import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "./users/users.module";
import * as Joi from "joi";
import { AdminModule } from "@adminjs/nestjs";
import { User } from "./users/entities/user.entity";
import adminjs from "adminjs";
import { Database, Resource } from "@adminjs/typeorm";
import { AuthModule } from "./auth/auth.module";
import { PostsModule } from "./posts/posts.module";
import { Post } from "./posts/entities/post.entity";
import { CommentsModule } from "./comments/comments.module";
import { LikesModule } from "./likes/likes.module";
import { Comment } from "./comments/entities/comment.entity";
import { ScrapsModule } from "./scraps/scraps.module";
import { Like } from "./likes/entities/like.entity";
import { Scrap } from "./scraps/entities/scrap.entity";
import { InterviewsModule } from "./interviews/interviews.module";

adminjs.registerAdapter({ Database, Resource });
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === "production"
          ? ".env.production"
          : ".env.development",
      validationSchema: Joi.object({
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      logging: true,
      autoLoadEntities: true,
      entities: [__dirname + "/**/entities/*.ts"],
    }),
    /**
     * adminjs 설정입니다.
     * resources는 모듈 생성시 수동으로 추가합니다.
     */
    AdminModule.createAdmin({
      adminJsOptions: {
        rootPath: "/admin",
        resources: [User, Post, Comment, Like, Scrap],
      },
      // auth: {
      //   authenticate: null,
      //   cookiePassword: "df",
      //   cookieName: "asdf",
      // },
    }),
    UsersModule,
    AuthModule,
    PostsModule,
    CommentsModule,
    LikesModule,
    ScrapsModule,
    InterviewsModule,
  ],
})
export class AppModule { }
