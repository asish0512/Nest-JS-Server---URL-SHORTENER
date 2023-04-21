import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  createdAt: { type: Date },
  updatedAt: { type: Date },
});

export interface User extends mongoose.Document {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}
