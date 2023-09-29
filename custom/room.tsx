import { useContext, useState } from "react";
import { createContext } from "react";

const RoomContext = createContext<{
    show : boolean;
    updateShow : () => void;
    id : string;
    updateId : (newId : string) => void;
}>({
    show : false,
    updateShow : () => {},
    id : '',
    updateId : (newId : string) => {}
});

export const RoomProvider : React.FC<{}> = ({children}) => {
    const [show, setShow] = useState(false);
    const [id, setId] = useState('');

    const updateShow = () => {
        setShow(prevShow => !prevShow);
    }

    const updateId = (newId : string) => {
        setId(newId);
    }

    return (
        <RoomContext.Provider
            value = {{
                show,
                updateShow,
                id,
                updateId
            }}
        >
            {children}
        </RoomContext.Provider>
    )
}

export const useRoom = () => useContext(RoomContext);