import {useState, useContext, createContext} from 'react';
import {useRouter} from 'next/router';
import {useCookies} from 'react-cookie';

type userObj = {
    displayName: string;
    email: string;
    refreshToken: string;
    uid : string;
    photoUrl : string;
}

const defaultUser : userObj = {
    displayName: '',
    email: '',
    refreshToken: '',
    uid : '',
    photoUrl : ''
}

const AuthContext = createContext<{
    accessToken : string | undefined;
    setAccessToken : (newToken : string) => void;
    idToken : string | undefined;
    setIdToken : (newToken : string) => void;
    removeToken : () => void;
    user : userObj;
    setUser : (newUser : userObj) => void;
}>({
    accessToken : undefined,
    setAccessToken : (newToken : string) => {},
    idToken : undefined,
    setIdToken : (newToken : string) => {},
    removeToken : () => {},
    user : defaultUser,
    setUser : (newUser : Object) => {}
});

export const AuthProvider : React.FC =  ({children}) => {
    const router = useRouter();
    const [cookies, setCookies, removeCookies] = useCookies(['auth']);
    const [accessToken, setAccessTokenState] = useState<string | undefined>(cookies.accessToken);
    const [idToken, setIdTokenState] = useState<string | undefined>(cookies.idToken);
    const [user, setUserState] = useState<userObj>(cookies.user || defaultUser);

    const setAccessToken = (newToken : string) : void => {
        setCookies('accessToken', newToken, {path : '/'});
        setAccessTokenState(newToken);
    }

    const setIdToken = (newToken : string) : void => {
        setCookies('idToken', newToken, {path : '/'});
        setIdTokenState(newToken);
    }

    const setUser = (newUser : userObj) : void => {
        setCookies('user', newUser, {path : '/'});
        setUserState(newUser);
    }

    const removeToken = () : void => {
        removeCookies('accessToken');
        removeCookies('idToken');
        removeCookies('user');
    }

    return (
        <AuthContext.Provider
            value = {{
                accessToken,
                idToken,
                setAccessToken,
                setIdToken,
                removeToken,
                user,
                setUser
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);


