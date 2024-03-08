import ChatBar from "@/components/shared/chat/ChatBar";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen p-[4rem] overflow-hidden bg-[#121317]">
      <div className="chat ">
        <ChatBar />
        <div className="chat__main">{children}</div>
      </div>
    </div>
  );
};

export default HomeLayout;
