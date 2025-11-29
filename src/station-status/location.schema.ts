import { Schema } from 'mongoose';

export type TLocation = {
  _id: string;
  last_ping: Date;
  address: string;
  name: string;
};

export const LocationSchema = new Schema<TLocation>(
  {
    last_ping: Date,
    address: String,
    name: String,
  },
  { collection: 'ocpilocations' },
);
