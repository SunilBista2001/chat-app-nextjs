import mongoose, { Model, Types } from "mongoose";

interface IMessage {
  roomId: String | number;
  sender: Types.ObjectId;
  receiver: Types.ObjectId;
  content: string;
  opened: boolean;
}

export interface IMessageDocument extends IMessage, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const chatSchema = new mongoose.Schema(
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
  mongoose.models?.Chat || mongoose.model<IMessageDocument>("Chat", chatSchema);

export default Message;
