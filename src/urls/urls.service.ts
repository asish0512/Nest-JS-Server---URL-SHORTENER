import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Url } from './urls.model';
import { HASH_LENGTH, URL_PREFIX, URL_PREFIX_LENGTH } from '../config/config';
import * as crypto from 'crypto';

@Injectable()
export class UrlsService {
  constructor(@InjectModel('Url') private readonly urlModel: Model<Url>) {}

  // Use MD5 hashing algorithm to hash the long url.
  // Also store only certain prefix length of the hash as storing
  // complete length would defeat the purose of this service.

  md5 = (contents: string) =>
    crypto.createHash('md5').update(contents).digest('hex');
  async insertUrl(longUrl: string, userId: string) {
    const hash = this.md5(longUrl).substring(0, HASH_LENGTH);

    // Checking if long url has already been hashed before
    // If so return the hash from db
    const url = await this.findUrl(hash, userId);
    if (url) {
      return url.hash as string;
    }

    // If not present create an object and return the prefix of hash.
    const newDate = new Date();
    const newUser = new this.urlModel({
      longUrl,
      hash,
      userId,
      createdAt: newDate,
    });
    const result = await newUser.save();
    return result.hash as string;
  }

  // Using this method a user can see the list of long urls that has been shortened
  async getUrls(userId: string) {
    const urls = await this.urlModel.find({ userId: userId }).exec();
    return urls.map((url) => ({
      longUrl: url.longUrl,
      shortUrl: URL_PREFIX + url.hash,
    }));
  }

  // Using this method a user can read the long url corresponding to a short url.
  async getSingleUrl(shortUrl: string, userId: string) {
    const hash = shortUrl.substring(URL_PREFIX_LENGTH, shortUrl.length);
    const url = await this.findUrl(hash, userId);
    return {
      longUrl: url.longUrl,
      shortUrl: URL_PREFIX + url.hash,
    };
  }

  // Used when a user deletes a long url and its corresponding short url also
  async deleteUrl(shortUrl: string) {
    const hash = shortUrl.substring(URL_PREFIX_LENGTH, shortUrl.length);
    const result = await this.urlModel.deleteOne({ hash: hash }).exec();
    return result;
  }

  // When a user deletes his account all long urls shortened from this account
  // should be deleted
  async deleteAllUrls(userId: string) {
    const result = await this.urlModel.deleteMany({ userId: userId }).exec();
    return result;
  }

  // Used to check a short url corresponding to a user
  private async findUrl(id: string, userId: string): Promise<Url> {
    const url = await this.urlModel
      .findOne({
        hash: id,
        userId: userId,
      })
      .exec();
    return url;
  }
}
