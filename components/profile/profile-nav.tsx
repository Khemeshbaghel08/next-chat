import classes from './styles/profile-nav.module.scss';
import {AiOutlineArrowLeft} from 'react-icons/ai';

const ProfileNav : React.FC<{toggleShow:() => void;}> = (props) => {
    return (
        <div
            className={[
                classes.profile_nav_container,
                "d-flex flex-column justify-content-end align-items-center"
            ].join(' ')}
        >
            <div
                className={[
                    classes.profile_nav_items_container,
                    "d-flex"
                ].join(' ')}
            >
                <button
                    className={[
                        "w-25",
                        "d-inline-flex align-items-center justify-content-start",
                        classes.profile_nav_item,
                        classes.profile_nav_item_back,
                    ].join(' ')}
                    onClick={props.toggleShow}
                >
                    <AiOutlineArrowLeft size="1.5rem" color="rgb(225, 225, 227)"/>
                </button>
                <div
                    className={[
                        "w-75 user-select-none",
                        "d-flex align-items-center justify-content-start",
                        classes.profile_nav_item,
                        classes.profile_nav_item_profile
                    ].join(' ')}
                >
                    Profile
                </div>
            </div>
        </div>
    )
}

export default ProfileNav;