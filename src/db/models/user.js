
import { Schema, model } from 'mongoose';

import { handleSaveError, setUpdateSettings } from './hooks.js';
import { emailRegexp } from '../../constants/users.js';


const usersSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: emailRegexp,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
   },
  {
    versionKey: false,
    timestamps: true,
  },
);

usersSchema.post('save', handleSaveError);
usersSchema.pre('findOneAndUpdate', setUpdateSettings);
usersSchema.post('findOneAndUpdate', handleSaveError);

const User = model('users', usersSchema);

export default User;
