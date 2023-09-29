import classes from './styles/chats-list.module.scss';
import Chat from './chat';
import {useAuth} from '../../custom/auth';

import {firebase} from '../../pages/_app';
import { useEffect } from 'react';
import { useState } from 'react';

const db=firebase.firestore();

type listObj = {
    name : string;
    id : string;
    creator : string;
};

const ChatsList : React.FC<{}> = (props) => {
    const [list, setList] = useState<listObj[]>([]);
    const {user} = useAuth();

    useEffect(() => {
        const unsucscribe = db.collection('rooms').where('members','array-contains',user.uid)
            .onSnapshot(qs => {
                const temp : listObj[] = [];
                qs.forEach(doc => {
                    temp.push({
                        name : doc.data().name,
                        id : doc.data().id,
                        creator : doc.data().creator
                    })
                })
                setList(temp);
            })
            
        return () => {
            unsucscribe();
        }
    }, [])

    const show = list.map((room, index) => {
        return (
            <Chat 
                key={index}
                name={room.name}
                id={room.id}
                creator={room.creator}
            />
        )   
    })

    return (
        <div
            className={[
                classes.chats_list_container
            ].join(' ')}
        >
            {show}
        </div>
    );
}

export default ChatsList;