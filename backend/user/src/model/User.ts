import mongoose, { Schema, Types } from 'mongoose';
export interface IUser extends Document {
  _id: Types.ObjectId;
  name: String;
  email: String;
}

const schema = new Schema(
  {
    _id: {
      type: Types.ObjectId,
      auto: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model<IUser>('User', schema);
