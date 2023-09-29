import ChatDetailsMembers from './chat-details-members';
import ChatDetailsNav from './chat-details-nav';
import ChatDetailsPicture from './chat-details-picture';
import classes from './styles/chat-details.module.scss';

const ChatDetails : React.FC<{show:boolean; hide:(val: boolean) => void;}> = (props) => {
    const chatDetailsClasses = [
        'w-100 h-100',
        classes.chat_details_container
    ]

    if (props.show) {
        chatDetailsClasses.push(classes.open);
    } else {
        chatDetailsClasses.push(classes.close);
    }

    return (
        <div
            className={chatDetailsClasses.join(' ')}
        >
            <ChatDetailsNav close={props.hide}/>
            <ChatDetailsPicture />
            <ChatDetailsMembers />
        </div>
    )
}

export default ChatDetails;