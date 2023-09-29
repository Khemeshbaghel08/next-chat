import * as styles from "./styles";

import ChatNavbar from "./chat-navbar";
import ChatMessage from "./chat-message";
import ChatMessages from "./chat-messages";

const Chat: React.FC<{ show: boolean }> = (props) => {
  return (
    <styles.ChatContainer show={props.show}>
      <ChatNavbar />
      <ChatMessages />
      <ChatMessage />
    </styles.ChatContainer>
  );
};

export default Chat;
