import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.model';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UrlsService } from 'src/urls/urls.service';
import { UrlSchema } from 'src/urls/urls.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Url', schema: UrlSchema },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UrlsService],
})
export class UsersModule {}
