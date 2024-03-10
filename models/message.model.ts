import mongoose, { Model, Types } from "mongoose";

interface IMessage {
  roomId: string | number;
  sender: Types.ObjectId;
  receiver: Types.ObjectId;
  content: string;
  opened: boolean;
}

export interface IMessageDocument extends IMessage, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    opened: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Message: Model<IMessageDocument> =
  mongoose.models?.Message ||
  mongoose.model<IMessageDocument>("Message", messageSchema);

export default Message;
