"use server";

import Chat, { IChatDocument } from "@/models/chat.model";
import { auth, signIn, signOut } from "./auth";
import Message, { IMessageDocument } from "@/models/message.model";
import { revalidatePath } from "next/cache";

export const authAction = async () => {
  try {
    await signIn("github");
  } catch (error: any) {
    if (error.message === "NEXT_REDIRECT") {
      throw error;
    }
    return error.message;
  }
};

export const logoutAction = async () => {
  await signOut();
};

export const sendMessageAction = async (
  receiverId: string,
  content: string
) => {
  try {
    const session = await auth();
    if (!session) return null;

    const newMessage: IMessageDocument = await Message.create({
      sender: session.user?._id,
      receiver: receiverId,
      content,
      opened: false,
    });

    const isChatExist: IChatDocument | null = await Chat.findOne({
      participants: { $all: [session.user?._id, receiverId] },
    });

    if (!isChatExist) {
      await Chat.create({
        participants: [session.user?._id, receiverId],
        messages: [newMessage._id],
      });
    } else {
      await Chat.findOneAndUpdate(
        {
          participants: { $all: [session.user?._id, receiverId] },
        },
        { $push: { messages: newMessage._id } }
      );
      await isChatExist?.save();
    }

    revalidatePath(`/chat/${receiverId}`);
  } catch (error) {
    console.log("error in sendMessage from SS: ", error);
  }
};
