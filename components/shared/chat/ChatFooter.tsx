"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useMessage from "@/hooks/useMessage";
import useSocket from "@/hooks/useSocket";
import { sendMessageAction } from "@/lib/actions";
import { File, Loader2, SendHorizonal } from "lucide-react";
import { Session } from "next-auth";
import { useParams } from "next/navigation";
import { useState } from "react";

const ChatFooter = ({ session }: { session: Session }) => {
  const messageState = useMessage();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const { id } = useParams<{ id: string }>();

  const socket = useSocket("http://localhost:3001");

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      await sendMessageAction(id, message);

      const msgData = {
        sender: session?.user?._id,
        receiver: id,
        content: message,
        opened: false,
      };

      // @ts-ignore
      messageState.addMessage(msgData);

      await socket.emit("send_msg", msgData);
    } catch (error) {
      setIsLoading(false);
      console.log("error in implement send message action", error);
    } finally {
      setIsLoading(false);
      setMessage("");
    }
  };

  return (
    <div className="chat__footer rounded-lg">
      <form className="form space-x-2" onSubmit={sendMessage}>
        {/* <Button variant={"secondary"}>
          <File size={24} />
        </Button> */}
        <Input
          placeholder="Write message"
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button type="submit" variant={"secondary"}>
          {isLoading ? (
            <Loader2 size={24} className="animate-spin" />
          ) : (
            <SendHorizonal size={24} />
          )}
        </Button>
      </form>
    </div>
  );
};

export default ChatFooter;
