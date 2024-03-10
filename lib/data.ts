import User, { IUserDocument } from "@/models/user.model";
import { auth } from "./auth";
import { connectToMongoDB } from "./db";
import Chat, { IChatDocument } from "@/models/chat.model";

export const getUsersForSidebar = async () => {
  try {
    const session = await auth();
    await connectToMongoDB();

    if (!session) return;

    const users: IUserDocument[] = await User.find({
      _id: {
        $ne: session?.user?._id,
      },
    });

    return users;
  } catch (error) {
    console.log("error on getting data for sidebar: ", error);
  }
};

export const getMessages = async (authUserId: string, receiverId: string) => {
  try {
    await connectToMongoDB();

    const chat: IChatDocument | null = await Chat.findOne({
      participants: {
        $all: [authUserId, receiverId],
      },
    }).populate("messages");

    if (!chat) return [];

    const messages = chat.messages;

    return JSON.parse(JSON.stringify(messages));
  } catch (error) {
    console.log("Error in getting messages from server: ", error);
  }
};
