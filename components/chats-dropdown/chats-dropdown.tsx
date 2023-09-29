import classes from './styles/chats-dropdown.module.scss';

const ChatsDropdown : React.FC<{show:boolean; logout:() => void;}> = (props) => {
    const dropdownClasses=[
        "shadow-lg rounded",
        "user-select-none",
        "m-0 p-0",
        "list-group",
        classes.chats_dropdown_container,
    ]

    if (props.show) {
        dropdownClasses.push(classes.open);
    } else {
        dropdownClasses.push(classes.close);
    }

    return (
        <ul
            className={dropdownClasses.join(' ')}
        >
            <li 
                className={[
                    "list-group-item",
                    classes.chats_dropdown_item
                ].join(' ')}
                onClick={props.logout}
            >
                Logout
            </li>
        </ul>
    )
}

export default ChatsDropdown;