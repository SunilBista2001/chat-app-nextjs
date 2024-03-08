import mongoose, { Model, PopulatedDoc } from "mongoose";
import { IUserDocument } from "./user.model";
import { IMessageDocument } from "./message.model";

interface IChat {
  participants: mongoose.Types.ObjectId[] | PopulatedDoc<IUserDocument>;
  messages: mongoose.Types.ObjectId[] | PopulatedDoc<IMessageDocument>;
}

export interface IChatDocument extends IChat, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const chatSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Chat: Model<IChatDocument> =
  mongoose.models.Chat || mongoose.model<IChatDocument>("Chat", chatSchema);

export default Chat;
