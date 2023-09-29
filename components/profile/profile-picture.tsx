import classes from './styles/profile-picture.module.scss';

import { useAuth } from '../../custom/auth';

export default function ProfilePicture() {
    const { user } = useAuth();

    return (
        <div
            className={[
                "d-flex justify-content-center align-items-center",
                classes.profile_picture_container
            ].join(' ')}
        >
            <div
                className={[
                    classes.profile_picture
                ].join(' ')}
                style={{
                    backgroundImage: `url(${user.photoUrl})`
                }}
            />
        </div>
    )    
}