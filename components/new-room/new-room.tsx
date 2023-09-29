import { useRef } from 'react';
import { useRoom } from '../../custom/room';
import classes from './styles/new-room.module.scss';
import { firebase } from '../../pages/_app';
import { useAuth } from '../../custom/auth';

const db = firebase.firestore();

const NewRoom : React.FC<{}> = (props) => {
    const {show, updateShow, updateId} = useRoom();
    const {user} = useAuth();
    const roomRef = useRef<HTMLInputElement>(null);

    const submitRoomHandler = async () => {
        const name = roomRef.current?.value;
        updateShow();

        if (!name) {
            return;
        }

        const qs = await db.collection('rooms').add({
            name : name,
            members : [user.uid],
            creator : user.uid,
        })

        await qs.update({
            id : qs.id
        })

        await db.collection('rooms').doc(qs.id).collection('users').doc(user.uid).set({
            name: user.displayName,
            email: user.email,
            id: user.uid,
            photoUrl: user.photoUrl
        })

        updateId(qs.id);
    }

    const roomClasses = [
        "shadow-lg rounded",
        "user-select-none",
        "m-0 p-0",
        "list-group",
        classes.new_room_form
    ];

    if (show) {
        roomClasses.push(classes.open);
    } else {
        roomClasses.push(classes.close);
    }

    return (
        <ul
            className = {roomClasses.join(' ')}
        >
            <li
                className = {[
                    "d-flex justify-content-center align-items-center",
                    "list-group-item",
                    classes.new_room_form_item,
                    classes.new_room_form_item_title
                ].join(' ')}
            >
                New Room
            </li>
            <li
                className = {[
                    "d-flex justify-content-center align-items-center",
                    "list-group-item",
                    classes.new_room_form_item,
                    classes.new_room_form_item_input
                ].join(' ')}
            >
                <input 
                    type = "text"
                    placeholder = "Room Name"
                    ref = {roomRef}
                    className = {[
                        classes.new_room_form_item_input_input
                    ].join(' ')}
                />
            </li>
            <li
                className = {[
                    "d-flex justify-content-center align-items-center",
                    "list-group-item",
                    classes.new_room_form_item,
                    classes.new_room_form_item_submit
                ].join(' ')}
            >
                <button
                    className = {[
                        "d-flex justify-content-center align-items-center",
                        "shadow",
                        classes.new_room_form_item_submit_button
                    ].join(' ')}
                    onClick={submitRoomHandler}
                >
                    Create Room
                </button>
            </li>
        </ul>
    )
}

export default NewRoom;