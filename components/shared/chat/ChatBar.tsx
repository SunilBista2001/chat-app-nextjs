import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth } from "@/lib/auth";
import { getUsersForSidebar } from "@/lib/data";
import Link from "next/link";
import LogoutBtn from "../LogoutBtn";

const ChatBar = async () => {
  const session = await auth();
  const users = await getUsersForSidebar();

  return (
    <div className="chat__sidebar rounded-lg bg-gray-400">
      <div className="flex justify-between">
        <Avatar>
          <AvatarImage src={session?.user?.image!} alt={session?.user.name!} />
          <AvatarFallback className="text-gray-700">
            {session?.user?.name}
          </AvatarFallback>
        </Avatar>

        <LogoutBtn />
      </div>

      <div>
        <h4 className="chat__header">All</h4>
        <div className="chat__users">
          {users?.map((user, idx) => (
            <Link
              key={idx}
              href={`/chat/${user._id}`}
              className="flex space-x-2 cursor-pointer text-white hover:bg-white p-1 hover:text-black rounded-b-lg rounded-tr-lg"
            >
              <Avatar className="text-black">
                <AvatarImage src={user.avatar} />
                <AvatarFallback>
                  {user.username.charAt(0).toUpperCase() +
                    "" +
                    user.username.split(" ")[1].charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span>{user.username}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatBar;
