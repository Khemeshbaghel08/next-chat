import { createContext, useState, useContext } from "react";

const ChatContext = createContext<{
    name : string;
    updateName: (newName : string) => void;
    id : string;
    updateId: (newId : string) => void;
    show : boolean;
    updateShow: (newShow : boolean) => void;
    creator : string;
    updateCreator: (newCreator : string) => void;
}>({
    name : '',
    updateName: (newName : string) => {},
    id : '',
    updateId: (newId : string) => {},
    show : false,
    updateShow: (newShow : boolean) => {},
    creator : '',
    updateCreator: (newCreator : string) => {}
})

export const ChatProvider : React.FC = ({children}) => {
    const [name, setName] = useState('');
    const [id, setId] = useState('');
    const [show, setShow] = useState(false);
    const [creator, setCreator] = useState('');

    const updateShow = (newShow : boolean) => {
        setShow(newShow);
    }

    const updateName = (newName : string) => {
        setName(newName);
    }

    const updateId = (newId : string) => {
        setId(newId);
    }

    const updateCreator = (newCreator : string) => {
        setCreator(newCreator);
    }

    return (
        <ChatContext.Provider
            value={{
                name, 
                updateName,
                id, 
                updateId,
                show,
                updateShow,
                creator,
                updateCreator
            }}
        >
            {children}
        </ChatContext.Provider>
    )
}

export const useChat = () => useContext(ChatContext);