const ChatFooter = () => {
  return (
    <div className="chat__footer rounded-lg">
      <form className="form">
        <input type="text" placeholder="Write message" className="message" />

        <button className="sendBtn">SEND</button>
      </form>
    </div>
  );
};

export default ChatFooter;
