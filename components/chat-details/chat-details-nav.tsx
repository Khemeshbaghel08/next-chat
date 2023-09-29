import { AiOutlineClose } from 'react-icons/ai';
import classes from './styles/chat-details-nav.module.scss';

const ChatDetailsNav : React.FC<{close:(val : boolean) => void;}> = (props) => {
    return (
        <div
            className = {[
                "d-flex justify-content-center align-items-center",
                classes.chat_details_nav_container
            ].join(' ')}
        >
            <div
                className = {[
                    "d-flex justify-content-center align-items-center",
                    classes.chat_details_nav_item,
                    classes.chat_details_nav_item_close
                ].join(' ')}
                onClick={() => props.close(false)}
            >
                <AiOutlineClose size="1.5rem" color="rgb(177, 179, 181)"/>
            </div>

            <div
                className = {[
                    "d-flex align-items-center",
                    "user-select-none",
                    classes.chat_details_nav_item,
                    classes.chat_details_nav_item_title
                ].join(' ')}
            >
                Room Details
            </div>
        </div>
    )
}

export default ChatDetailsNav;