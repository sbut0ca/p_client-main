import React, {useContext} from 'react';
import {Button, Container} from "react-bootstrap";
import styles from '../styles/loadingorerrorpage.module.css'
import Loader from "../components/Loader";
import {Context} from "../main";
import {observer} from "mobx-react-lite";
import {Link, useNavigate} from "react-router-dom";
import {faTriangleExclamation} from "@fortawesome/free-solid-svg-icons/faTriangleExclamation";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const LoadingOrErrorPage = observer(() => {

    const {store} = useContext(Context)
    const navigate = useNavigate()

    if (store.isLoading) {
        return (
            <Container>
                <div className={styles.loadingPage}>
                    <h1>Загрузка...</h1>
                    <Loader/>
                </div>
            </Container>
        );
    }

    if (!store.currentUser && !store.isLoading) {
        return (
            <Container>
                <div className={styles.loadingPage}>
                    <FontAwesomeIcon icon={faTriangleExclamation} size={'3x'}/><h1>Доступ запрещен</h1>
                    <h3>Требуется выполнить вход в аккаунт</h3>
                    <div className={styles.buttons}>
                        <Button style={{width: '168px'}} onClick={() => navigate('/auth')}>Войти</Button>
                    </div>
                </div>
            </Container>
        );
    }

    if (store.currentUser && !store.isLoading) {
        return (
            <Container>
                <div className={styles.loadingPage}>
                    <FontAwesomeIcon icon={faTriangleExclamation} size={'3x'}/><h1>Страница не найдена</h1>
                    <h3>Или у вас нет к ней доступа</h3>
                    <div className={styles.buttons}>
                        <Button onClick={() => navigate('/')}>На главную</Button>
                        <Button variant={'outline-secondary'} onClick={() => navigate('/auth')}>Выбрать другой аккаунт</Button>
                    </div>
                </div>
            </Container>
        );
    }

    return (
        <Container>
            <div className={styles.loadingPage}>
                <h1>Загрузка...</h1>
                <Loader/>
            </div>
        </Container>
    );
})

export default LoadingOrErrorPage;