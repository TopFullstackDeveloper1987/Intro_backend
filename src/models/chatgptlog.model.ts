import { Document, model, Schema } from 'mongoose';
import { toJSON } from './plugins';

export interface IChatGpt extends Document {
  message: string;
  reqest: string;
  user: Schema.Types.ObjectId;
}

const chatgptlogSchema = new Schema<IChatGpt>(
  {
    message: {
      type: String,
      required: true,
    },
    reqest: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true
    },
  },
  {
    timestamps: true
  }
);

// add plugin that converts mongoose to json
chatgptlogSchema.plugin(toJSON);

export const ChatGptLOG = model<IChatGpt>('chatgptlog', chatgptlogSchema);
