import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { UrlsModule } from './urls/urls.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://asish0512:VXtH5BGdKo8GCbkk@cluster0.sbkmb4y.mongodb.net/test',
    ),
    UsersModule,
    UrlsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
