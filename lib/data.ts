import User, { IUserDocument } from "@/models/user.model";
import { auth } from "./auth";
import { connectToMongoDB } from "./db";

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
