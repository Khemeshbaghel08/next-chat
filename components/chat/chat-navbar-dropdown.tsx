import classes from "./styles/chat-navbar-dropdown.module.scss";
import { firebase } from "../../pages/_app";
import { useAuth } from "../../custom/auth";
import { useChat } from "../../custom/individualChat";

const db = firebase.firestore();

const ChatDropdown: React.FC<{ show: boolean }> = (props) => {
  const { user } = useAuth();
  const { creator, id, updateShow } = useChat();

  const deleteChatHandler = async () => {
    if (creator !== user.uid) {
      return;
    }

    try {
      await db.collection("rooms").doc(id).delete();
      updateShow(false);
    } catch (err: any) {
      console.log(err.code);
    }
  };

  const dropdownClasses = [
    "list-group",
    "shadow-lg user-select-none",
    classes.chat_dropdown_container,
  ];
  if (props.show) {
    dropdownClasses.push(classes.open);
  } else {
    dropdownClasses.push(classes.close);
  }

  return (
    <ul className={dropdownClasses.join(" ")}>
      <li
        className={["list-group-item", classes.chat_dropdown_item].join(" ")}
        onClick={deleteChatHandler}
      >
        Delete Chat
      </li>
      <li className={["list-group-item", classes.chat_dropdown_item].join(" ")}>
        Clear Messages
      </li>
    </ul>
  );
};

export default ChatDropdown;
