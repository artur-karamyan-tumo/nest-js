import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    PostsModule,
    MongooseModule.forRoot(
      'mongodb+srv://arturkaramyan90:eV888CinU1mDsvKu@cluster0.xn5opf3.mongodb.net/nestjs-demo?retryWrites=true&w=majority',
    ),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
