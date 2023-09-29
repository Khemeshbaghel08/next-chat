import classes from './styles/profile-details.module.scss';

import ProfileDetail from './profile-detail';
import { useAuth } from '../../custom/auth';

export default function ProfileDetails() {
    const { user } = useAuth();

    return (
        <div
            className={[
                classes.profile_details_container
            ].join(' ')}
        >
            <ProfileDetail label="Your Name" name={user.displayName} about=""/>
            <ProfileDetail label="About" about="Hey there! I am using whatsapp" name=""/>
        </div>
    )
}