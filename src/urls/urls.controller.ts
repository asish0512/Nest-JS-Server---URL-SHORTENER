import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { HttpStatusCode } from 'axios';
import { URL_PREFIX } from '../config/config';
import { UrlsService } from './urls.service';

@Controller('urls')
export class UrlsController {
  constructor(private readonly urlsService: UrlsService) {}

  @Post()
  async addShortUrl(
    @Body('longUrl') longUrl: string,
    @Body('userId') userId: string,
  ) {
    const generatedId = await this.urlsService.insertUrl(longUrl, userId);
    return {
      status: HttpStatusCode.Created,
      message: 'Url has been created sucessfully',
      data: { shorturl: URL_PREFIX + generatedId, longUrl, userId },
    };
  }

  @Get()
  async getAllUrls(@Body('userId') userId: string) {
    const urls = await this.urlsService.getUrls(userId);
    return {
      status: HttpStatusCode.Ok,
      message: 'Urls retrieved sucessfully',
      data: urls,
    };
  }

  @Get(':userId')
  async getUrl(
    @Param('userId') userId: string,
    @Body('shortUrl') shortUrl: string,
  ) {
    const url = await this.urlsService.getSingleUrl(shortUrl, userId);
    return {
      status: HttpStatusCode.Ok,
      message: 'Url retrieved sucessfully',
      data: url,
    };
  }

  // Not attributes present to update
  // Makes sense when we have other attriubtes like alias etc for each long url

  @Delete()
  async removeUrl(@Body('shortUrl') shortUrl: string) {
    const result = await this.urlsService.deleteUrl(shortUrl);
    if (result.deletedCount === 0) {
      return {
        status: HttpStatusCode.NotFound,
        message: 'Url not found',
      };
    } else {
      return {
        status: HttpStatusCode.Ok,
        message: 'Url deleted sucessfully',
      };
    }
  }
}
