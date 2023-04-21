import * as mongoose from 'mongoose';

export const UrlSchema = new mongoose.Schema({
  longUrl: { type: String, required: true },
  hash: { type: String, required: true, unique: true },
  createdAt: { type: Date },
  updatedAt: { type: Date },
  userId: { type: String, required: true },
});

export interface Url extends mongoose.Document {
  longUrl: string;
  hash: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}
