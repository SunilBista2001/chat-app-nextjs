import ChatBody from "@/components/shared/chat/ChatBody";
import ChatFooter from "@/components/shared/chat/ChatFooter";
import ChatTopBar from "@/components/shared/chat/ChatTopBar";
import { auth } from "@/lib/auth";
import { getMessages } from "@/lib/data";

const page = async ({ params }: { params: { id: string } }) => {
  const session = await auth();

  if (!session) return null;

  const messages = await getMessages(session.user?._id, params?.id);

  return (
    <>
      <ChatTopBar />
      <ChatBody messages={messages} session={session} />
      <ChatFooter session={session} />
    </>
  );
};

export default page;
