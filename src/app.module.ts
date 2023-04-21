import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { UrlsModule } from './urls/urls.module';
import { USERNAME, PASSWORD } from 'ENV/db';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://' +
        USERNAME +
        ':' +
        PASSWORD +
        '@cluster0.sbkmb4y.mongodb.net/test',
    ),
    UsersModule,
    UrlsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
