const ChatBody = () => {
  return (
    <>
      <header className="chat__mainHeader rounded-lg">
        <p>Hangout with Colleagues</p>
        <button className="leaveChat__btn">LEAVE CHAT</button>
      </header>

      {/*This shows messages sent from you*/}
      <div className="message__container rounded-lg">
        <div className="message__chats">
          <p className="sender__name">You</p>
          <div className="message__sender">
            <p>Hello there</p>
          </div>
        </div>

        {/*This shows messages received by you*/}
        <div className="message__chats">
          <p>Other</p>
          <div className="message__recipient">
            <p>Hey, I'm good, you?</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBody;
