import { useEffect } from "react";
import { useState } from "react"
import { firebase } from '../pages/_app';

const storage = firebase.storage();

export const usePicture = (id: string) => {
    const [url, setUrl] = useState('');
    const ref = storage.refFromURL(`gs://whatsapp-clone-7cbae.appspot.com/rooms/${id}.jpg`);

    useEffect(() => {
        ref.getDownloadURL()
        .then(res => {
            setUrl(res);
        })
        .catch(err => {
            if (err.code === 'storage/object-not-found') {
                setUrl('/static/group-dummy.jpg');
            }
        })
    }, [id])

    return url;
}