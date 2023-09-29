import classes from './styles/chat-details-update.module.scss';
import { firebase } from '../../pages/_app';
import { useChat } from '../../custom/individualChat';

const storage = firebase.storage();

const ChatDetailsUpdate : React.FC<{show:boolean;}> = (props) => {
    const { id } = useChat();

    const fileUploadHandler = async (event: any) => {
        if (!event.target.files || event.target.files.length == 0) {
            return;
        }

        const file = event.target.files[0];
        const ref = storage.ref().child(`rooms/${id}.jpg`);

        const ss = await ref.put(file);
        console.log("uploaded successfully");
    }   

    const updateClasses = [
        "list-group",
        "user-select-none",
        classes.chat_details_update_container
    ]

    if (props.show) {
        updateClasses.push(classes.open);
    } else {
        updateClasses.push(classes.close);
    }

    return (
        <ul
            className={updateClasses.join(' ')}
        >
            <li
                className={[
                    "d-flex justify-content-center align-items-center",
                    classes.chat_details_update_item
                ].join(' ')}
            >
                <label htmlFor="avatar">Update Photo</label>
                <input 
                    type="file" 
                    name="avatar" 
                    id="avatar" 
                    accept="image/*"
                    className={classes.chat_details_update_item_picture}
                    onChange={(event) => fileUploadHandler(event)}
                />
            </li>
        </ul>
    )
}

export default ChatDetailsUpdate;