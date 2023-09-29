import classes from './styles/chat-messages.module.scss';
import {firebase} from '../../pages/_app';
import { useState } from 'react';
import { useChat } from '../../custom/individualChat';
import { useAuth } from '../../custom/auth';
import { useEffect } from 'react';
import { useRef } from 'react';

const db = firebase.firestore();

type messageObj = {
    sender : {
        id: string,
        name: string,
    };
    content : string;
};

export default function ChatMessages () {
    const [msgs, setMsgs] = useState<messageObj[]>([]);
    const { updateShow, id } = useChat();
    const {user} = useAuth();
    const dummy = useRef<HTMLDivElement>(null);

    useEffect(() => {

        if (id) {
            const unsubscribe = db.collection('rooms').doc(id)
                .collection('messages')
                .orderBy('timestamp','asc')
                .onSnapshot(qs => {
                    const mems : messageObj[] = [];
                    qs.forEach(doc => {

                        mems.push({
                            sender : doc.data()?.sender,
                            content : doc.data()?.content,
                        })
                    })
                    setMsgs(mems);
                    dummy.current?.scrollIntoView({behavior : 'smooth'});
                })

            return () => {
                setMsgs([]);
                unsubscribe();
            }
        }
        
    }, [id]);

    useEffect(() => {
        return () => {
            updateShow(false);
        }
    }, [])

    let display = msgs.map((msg, ind) => {
        const msgClasses = [classes.chat_message_container];
        if (msg.sender.id === user.uid) {
            msgClasses.push(classes.right);
        } else {
            msgClasses.push(classes.left);
        }

        return (
            <div
                className = {msgClasses.join(' ')}
                key={ind}
            >
                <div
                    className = {[
                        'd-flex align-items-center',
                        'user-select-none',
                        classes.chat_name_container 
                    ].join(' ')}
                >
                    {msg.sender.name}
                </div>
                <div
                    className = {[
                        'd-flex align-items-center',
                        classes.chat_message_message_container
                    ].join(' ')}
                >
                    {msg.content}   
                </div>
            </div>
        )
    })
    
    return (
        <div
            className={[
                "d-flex flex-column",
                classes.chat_messages_container
            ].join(' ')}
        >
            {display}
            <div ref={dummy}></div>
        </div>
    )
}