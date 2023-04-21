import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { HttpStatusCode } from 'axios';
import { UsersService } from './users.service';
import { UrlsService } from '../urls/urls.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly urlsService: UrlsService,
  ) {}

  @Post()
  async addUser(
    @Body('name') userName: string,
    @Body('email') userEmail: string,
  ) {
    const user = await this.usersService.insertUser(userName, userEmail);
    return {
      status: HttpStatusCode.Created,
      message: 'User has been created sucessfully',
      data: user,
    };
  }

  @Get()
  async getAllUsers() {
    const users = await this.usersService.getUsers();
    return {
      status: HttpStatusCode.Ok,
      message: 'Users details retrieved sucessfully',
      data: users,
    };
  }

  @Get(':id')
  async getUser(@Param('id') userId: string) {
    const user = await this.usersService.getSingleUser(userId);
    if (!user) {
      return {
        status: HttpStatusCode.Ok,
        message: 'User details retrieved successfully',
        data: user,
      };
    } else {
      return {
        status: HttpStatusCode.NotFound,
        message: 'User details not found',
      };
    }
  }

  @Patch(':id')
  async updateUser(
    @Param('id') userId: string,
    @Body('name') userName: string,
    @Body('email') userEmail: string,
  ) {
    const user = await this.usersService.updateUser(
      userId,
      userName,
      userEmail,
    );
    return {
      status: HttpStatusCode.Ok,
      message: 'User details updated successfully',
      data: user,
    };
  }

  @Delete(':id')
  async removeUser(@Param('id') userId: string) {
    const urls = await this.urlsService.deleteAllUrls(userId);
    console.log('URLS', urls);
    const result = await this.usersService.deleteUser(userId);
    if (result.deletedCount === 0) {
      return {
        status: HttpStatusCode.NotFound,
        message: 'User details not found',
      };
    } else {
      return {
        status: HttpStatusCode.Ok,
        message: 'User details of' + userId + 'deleted successfully',
      };
    }
  }
}
