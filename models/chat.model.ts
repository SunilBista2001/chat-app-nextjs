import mongoose, { PopulatedDoc } from "mongoose";
import { IUserDocument } from "./user.model";
import { IMessageDocument } from "./message.model";
import { Types } from "mongoose";

interface IChat {
  participants: Types.ObjectId[] | PopulatedDoc<IUserDocument>;
  messages: Types.ObjectId[] | PopulatedDoc<IMessageDocument>;
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

const Chat =
  mongoose.models?.Chat || mongoose.model<IChatDocument>("Chat", chatSchema);

export default Chat;
