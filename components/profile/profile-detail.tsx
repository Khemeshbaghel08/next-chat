import classes from './styles/profile-detail.module.scss';
import {RiPencilFill} from 'react-icons/ri';
import {TiTick} from 'react-icons/ti';
import { useEffect, useRef, useState } from 'react';

const ProfileDetail : React.FC<{label:string; name:string; about:string;}> = (props) => {
    const [edit, setEdit] = useState(true);
    const editDetailRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (edit) {
            editDetailRef.current?.removeAttribute('contentEditable');
        }
    },[edit])

    const toggleEditMode = () => {
        editDetailRef.current?.setAttribute('contentEditable','true');
        setEdit(prevEdit => !prevEdit);
    }

    const profileDetailClasses = [
        "d-flex align-items-center",
        classes.profile_detail
    ]
    if (!edit) {
        profileDetailClasses.push(classes.profile_detail_editing);
    }

    return (
        <div
            className={[
                "d-flex flex-column justify-content-center align-items-center",
                classes.profile_detail_container
            ].join(' ')}
        >
            <div
                className={[
                    "d-flex justify-content-start align-items-center",
                    "user-select-none",
                    classes.profile_detail_label
                ].join(' ')}
            >
                {props.label}
            </div>
            <div
                className={profileDetailClasses.join(' ')}
            >
                <div
                    className={[
                        "d-flex align-items-center",
                        classes.profile_detail_detail
                    ].join(' ')}
                    ref={editDetailRef}
                    onFocus={(e) => e.target.textContent=''}
                >
                    {props.name || props.about}
                </div>
                <div
                    className={[
                        "d-flex align-items-center justify-content-end",
                        classes.profile_detail_edit
                    ].join(' ')}
                    onClick={toggleEditMode}
                >
                    {edit ? 
                    <RiPencilFill size="1.5rem" color="rgb(177, 179, 181)"/>
                    :
                    <TiTick size="1.5rem" color="rgb(177,1 79, 181)"/>}
                </div>
            </div>
        </div>
    )
}

export default ProfileDetail;