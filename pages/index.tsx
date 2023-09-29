import App from '../components/app';
import Head from 'next/head';

export default function RootPage () {
    return (
        <>
        <Head>
            <title>Next Chat</title>
        </Head>
        <App />
        </>
    )
}