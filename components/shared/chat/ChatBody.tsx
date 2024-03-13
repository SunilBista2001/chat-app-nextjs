"use client";

import useMessage from "@/hooks/useMessage";
import { IMessageDocument } from "@/models/message.model";
import { PopulatedDoc } from "mongoose";
import { Session } from "next-auth";
import { useEffect } from "react";

type ChatProps = {
  messages: IMessageDocument[] | PopulatedDoc<IMessageDocument>[];
  session: Session | null;
};

const ChatBody = ({ messages, session }: ChatProps) => {
  const authUserId = session?.user?._id;

  return (
    <>
      {/*This shows messages sent from you*/}
      <div className="message__container rounded-lg">
        {messages
          // @ts-ignore
          ?.filter((message) => message?.sender === authUserId)
          ?.map((message, idx) => {
            const isPrevMessageSameSender =
              // @ts-ignore
              idx > 0 && messages[idx - 1]?.sender === message?.sender;

            return (
              <div key={idx} className="message__chats">
                {!isPrevMessageSameSender && (
                  <p className="sender__name text-white">You</p>
                )}
                <div className="message__sender rounded-t-2xl rounded-bl-2xl rounded-br-md text-sm ">
                  {/* @ts-ignore */}
                  <p>{message.content}</p>
                </div>
              </div>
            );
          })}

        {/*This shows messages received by you*/}
        {messages
          // @ts-ignore
          ?.filter((message) => message.sender !== authUserId)
          ?.map((message, idx) => {
            const isPrevMessageSameSender =
              idx > 0 && messages[idx - 1]?.receiver === message?.receiver;
            return (
              <div key={idx} className="message__chats">
                {!isPrevMessageSameSender && <p>Other</p>}
                <div className="message__recipient rounded-t-2xl rounded-br-2xl rounded-bl-md text-sm">
                  <p>{message.content}</p>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default ChatBody;
