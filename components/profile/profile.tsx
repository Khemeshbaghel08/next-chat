import classes from './styles/profile.module.scss';

import { useAuth } from '../../custom/auth';
import ProfileNav from './profile-nav';
import ProfilePicture from './profile-picture';
import ProfileDetails from './profile-details';

const Profile : React.FC<{show:boolean; toggleShow:() => void;}> = (props) => {
    const {user} = useAuth();

    const styleClasses = [
        "w-100 h-100",
        classes.profile_settings_container,
    ];
    if (props.show) {
        styleClasses.push(classes.open);
    } else {
        styleClasses.push(classes.close);
    }
        
    return (
        <div
            className={styleClasses.join(' ')}
        >
            <ProfileNav toggleShow={props.toggleShow}/>
            <div
                className={[
                    classes.profile_settings,
                    "d-flex flex-column"
                ].join(' ')}
            >
                <ProfilePicture />
                <ProfileDetails />
            </div>
        </div>
    );
}

export default Profile;