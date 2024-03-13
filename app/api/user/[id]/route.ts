import User from "@/models/user.model";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const userId = params.id;

    const user = await User.findById(userId);

    if (!user) {
      return Response.json({ message: "User not found" });
    }

    return Response.json(user);
  } catch (error: any) {
    return Response.json("message from server side error", error.message);
  }
};
