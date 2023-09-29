import { useEffect, useState } from 'react';
import { useChat } from '../../custom/individualChat';
import ChatDetailsUpdate from './chat-details-update';
import classes from './styles/chat-details-picture.module.scss';
import { firebase } from '../../pages/_app';
import { usePicture } from '../../custom/picture';

const ChatDetailsPicture : React.FC<{}> = (props) => {
    const { name, id } = useChat();
    const [updateList, setUpdateList] = useState(false);
    const url = usePicture(id);
    
    return (
        <div
            className={[
                "d-flex flex-column justify-content-center align-items-center",
                classes.chat_details_profile_container
            ].join(' ')}
        >
            <div
                className={[
                    "d-flex justify-content-center align-items-center",
                    classes.chat_details_profile_item,
                    classes.chat_details_profile_picture_container
                ].join(' ')}
            >
                <div
                    className={[
                        "d-flex justify-content-center align-items-center",
                        classes.chat_details_profile_picture
                    ].join(' ')}
                    style={{ backgroundImage: `url(${url})` }}
                    onMouseEnter = {() => setUpdateList(true)}
                    onMouseLeave = {() => setUpdateList(false)}
                >
                    <ChatDetailsUpdate show={updateList}/>
                </div>
            </div>
            <div
                className={[
                    "d-flex align-items-center",
                    classes.chat_details_profile_item,
                    classes.chat_details_profile_name
                ].join(' ')}
            >
                Name : {name}
            </div>
            <div
                className={[
                    "d-flex align-items-center",
                    classes.chat_details_profile_item,
                    classes.chat_details_profile_code
                ].join(' ')}
            >
                Code : {id}
            </div>
        </div>
    )
}

export default ChatDetailsPicture;