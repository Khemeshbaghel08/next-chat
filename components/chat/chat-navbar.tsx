import * as styles from "./styles";

import { FaEllipsisV } from "react-icons/fa";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { IoPersonAdd } from "react-icons/io5";

import ChatDropdown from "./chat-navbar-dropdown";
import ChatDetails from "../chat-details/chat-details";
import NewMember from "../new-member/new-member";

import { useState } from "react";
import { useChat } from "../../custom/individualChat";
import { usePicture } from "../../custom/picture";
import { useAuth } from "../../custom/auth";

const ChatNavbar: React.FC<{}> = (props) => {
  const [show, setShow] = useState(false);
  const { name, updateShow, id, creator } = useChat();
  const { user } = useAuth();
  const [seeDet, setSeeDet] = useState(false);
  const [addNew, setAddNew] = useState(false);
  const url = usePicture(id);

  const updateAddNew = () => {
    setShow(false);
    setAddNew((prev) => !prev);
  };

  const updateSeeDet = (val: boolean) => {
    setAddNew(false);
    setShow(false);
    setSeeDet(val);
  };

  const toggleDropdown = () => {
    setAddNew(false);
    setShow((prevShow) => !prevShow);
  };

  return (
    <>
      <styles.ChatNavbarContainer>
        <ul>
          <styles.BackButton onClick={() => updateShow(false)}>
            <AiOutlineArrowLeft size="1.5rem" color="rgb(177, 179, 181)" />
          </styles.BackButton>
          <styles.NavbarProfile onClick={() => updateSeeDet(true)}>
            <styles.NavbarProfilePicture
              style={{ backgroundImage: `url(${url})` }}
            />
          </styles.NavbarProfile>
          <styles.NavbarName>{name}</styles.NavbarName>
          {creator === user.uid ? (
            <styles.NavbarIconAdd onClick={updateAddNew}>
              <IoPersonAdd size="1.5rem" />
            </styles.NavbarIconAdd>
          ) : null}
          <styles.NavbarIconDropdown onClick={toggleDropdown}>
            <FaEllipsisV color="rgb(177, 179, 181)" size="1.1rem" />
          </styles.NavbarIconDropdown>
        </ul>
      </styles.ChatNavbarContainer>
      <ChatDetails show={seeDet} hide={updateSeeDet} />
      <ChatDropdown show={show} />
      <NewMember show={addNew} />
    </>
  );
};

export default ChatNavbar;
