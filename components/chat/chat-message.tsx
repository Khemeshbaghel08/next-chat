import classes from './styles/chat-message.module.scss';
import { IoSend } from 'react-icons/io5';
import { useRef } from 'react';
import {firebase} from '../../pages/_app';
import { useChat } from '../../custom/individualChat';
import { useAuth } from '../../custom/auth';

const db= firebase.firestore();

export default function ChatMessage () {
    const messageRef = useRef<HTMLInputElement>(null);
    const { user } = useAuth();
    const { id } = useChat();

    const sendMessageHandler = async (e: any) => {
        e.preventDefault();
        try {
            const body = messageRef.current?.value;

            if (messageRef.current) {
                messageRef.current.value = '';
            }
            messageRef.current?.focus();

            if (body) {
                await db.collection('rooms').doc(id).collection('messages').add({
                    sender : {
                        id: user.uid,
                        name: user.displayName,
                    },
                    content : body,
                    timestamp : firebase.firestore.FieldValue.serverTimestamp()
                })
            }
        
        } catch (e: any) {
            console.log(e.code);
        }
    }

    return (
        <form
            className={[
                "d-flex justify-content-center align-items-center",
                classes.chat_message_container
            ].join(' ')}
            onSubmit = {sendMessageHandler}
        >
            <input
                className={[
                    "d-flex align-items-center p-3",
                    classes.chat_message_type
                ].join(' ')}
                type="text"
                placeholder="Type a message"
                ref={messageRef}
            />
            <div
                className={[
                    "d-flex align-items-center justify-content-center",
                    classes.chat_message_send_container
                ].join(' ')}
            >
                <div
                    className={[
                        "d-flex align-items-center justify-content-center",
                        classes.chat_message_send_button
                    ].join(' ')}
                    onClick={sendMessageHandler}
                >
                    <IoSend size="1.5rem" color="white"/>
                </div>
            </div>
        </form>
    )
}