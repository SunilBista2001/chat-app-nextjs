"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IUserDocument } from "@/models/user.model";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import LogoutBtn from "../LogoutBtn";

const ChatTopBar = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<IUserDocument | null>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${id}`);
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.log("error from client side", error);
      }
    };

    getUser();
  }, [id]);

  return (
    <header className="chat__mainHeader rounded-lg">
      <div className="flex">
        <Avatar>
          <AvatarImage src={user?.avatar} alt={user?.username} />
          <AvatarFallback className="text-gray-700">
            {user?.username[0]}
          </AvatarFallback>
        </Avatar>
        <div className="ml-3">
          <h2 className="text-base font-semibold">{user?.username}</h2>
          <p className="text-gray-500 text-xs">Active Now </p>
        </div>
      </div>
    </header>
  );
};

export default ChatTopBar;
