import * as styles from "./styles";
import { firebase } from "../../pages/_app";

import Chats from "../chats/chats";
import Chat from "../chat/chat";
import { useChat } from "../../custom/individualChat";

export default function Home() {
  const { show, updateShow } = useChat();

  const logout = () => {
    updateShow(false);
    firebase
      .auth()
      .signOut()
      .then(() => console.log("Logged out Successfully"))
      .catch(() => console.log("Could not log out"));
  };

  return (
    <styles.HomeContainer>
      <Chats logout={logout} />
      <Chat show={show} />
    </styles.HomeContainer>
  );
}
