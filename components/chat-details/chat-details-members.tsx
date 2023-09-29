import classes from './styles/chat-details-members.module.scss';
import { firebase } from '../../pages/_app';
import { useEffect, useState } from 'react';
import { useChat } from '../../custom/individualChat';
import DummyProfile from '../dummy-profile/dummy-profile'; 
import { IoPersonRemove } from 'react-icons/io5';
import { useAuth } from '../../custom/auth';

type userObj = {
    displayName : string;
    uid : string;
    email : string;
    photoUrl : string;
};

const db = firebase.firestore();

const ChatDetailsMembers : React.FC<{}> = (props) => {
    const [users, setUsers] = useState<userObj[]>([]);
    const { id, creator } = useChat();
    const { user } = useAuth();

    useEffect(() => {
        
        if (id) {
            const unsubscribe = db.collection('rooms').doc(id).collection('users')
                                    .onSnapshot(qs => {
                                        const members : userObj[] = [];
                                        qs.forEach(doc => {
                                            members.push({
                                                displayName: doc.data().name,
                                                uid: doc.data().id,
                                                email: doc.data().email,
                                                photoUrl: doc.data().photoUrl,
                                            })
                                        })
                                        setUsers(members);
                                    })

            return (() => {
                console.log("unmounting");
                unsubscribe();
            })
        }

    }, [id]);

    const removeUserHandler = async (uid : string) => {
        try {
            if (users.length > 1) {
                await db.collection('rooms').doc(id).collection('users').doc(uid).delete();
                await db.collection('rooms').doc(id).update({
                    members: firebase.firestore.FieldValue.arrayRemove(uid)
                })
            } else {
                await db.collection('rooms').doc(id).delete();
            }
            const newUsers = users.filter(usr => usr.uid !== uid);
            setUsers(newUsers);
        
        } catch(err) {
            console.log(err.code);
        }
    }

    let display = users.map(member => {
        return (
            <div
                className = {[
                    "d-flex justify-content-center align-items-center",
                    classes.chat_details_members_member
                ].join(' ')}
                key = {member.uid}
            >
                <div
                    className = {[
                        "d-flex justify-content-center align-items-center",
                        classes.chat_details_members_member_picture
                    ].join(' ')}
                >
                    <div 
                        className = {classes.chat_details_members_member_picture_picture}
                        style={{ backgroundImage: `url(${member.photoUrl})` }}
                    />
                </div>
                <div
                    className = {[
                        "d-flex flex-column justify-content-center",
                        classes.chat_details_members_member_details
                    ].join(' ')}
                >
                    {member.displayName}
                </div>
                {user.uid === creator ? 
                    <div
                        className = {[
                            "d-flex flex-column justify-content-center",
                            classes.chat_details_members_member_dropdown
                        ].join(' ')}
                        onClick = {() => removeUserHandler(member.uid)}
                    >
                        <IoPersonRemove size="1.5rem"/>
                    </div>
                : null}
            </div>
        )
    })

    return (
        <div
            className={[
                classes.chat_details_members_container
            ].join(' ')}
        >
            {display}
        </div>
    )
}

export default ChatDetailsMembers;