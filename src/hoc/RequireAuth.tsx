import React, {useContext, useEffect} from 'react';
import {Navigate} from "react-router-dom";
import {Context} from "../main";
import {observer} from "mobx-react-lite";
import styles from '../styles/requireAuth.module.css'
import Loader from "../components/Loader";

interface RequireAuthProps {
    children?: React.ReactNode;
}

const RequireAuth: React.FC<RequireAuthProps> = observer(({children}): JSX.Element => {

    const {store} = useContext(Context);

    useEffect(() => {
        console.log('am i here')
    }, []);

    if (store.currentUser === null && !store.isLoading) {

        console.log(store.currentUser + 'zxc')
        console.log(store.isLoading + 'zxc')

        return <><Navigate to='auth'/></>
    }

    return (
        <>
            {store.isLoading &&
                <div className={styles.loadingContainer}>
                    <Loader/>
                </div>
            }

            {!store.isLoading && children}
        </>
    );
});

export default RequireAuth;