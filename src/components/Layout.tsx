import React, {useContext} from 'react';
import classes from "../styles/layout.module.css";
import {Outlet, useNavigate} from "react-router-dom";
import {Button, Col, Container, Row, Stack} from "react-bootstrap";
import {Context} from "../main";
import {toast} from "react-toastify";
import UserApi from "../api/userApi";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons/faUser";
import {faWarehouse} from "@fortawesome/free-solid-svg-icons/faWarehouse";
import {faFileLines} from "@fortawesome/free-solid-svg-icons/faFileLines";
import {faBookJournalWhills} from "@fortawesome/free-solid-svg-icons/faBookJournalWhills";
import {faScrewdriverWrench} from "@fortawesome/free-solid-svg-icons/faScrewdriverWrench";
import NavigationCard from "./NavigationCard";

const Layout = () => {

    const {store} = useContext(Context)
    const navigate = useNavigate()

    const logout = async () => {
        await store.Logout()
        toast.success('Вы успешно вышли из аккаунта')
        navigate('/auth')
    }

    const profile = async () => {
        const response = await UserApi.WhoAmIAsync('token');
    }
    if (store.currentUser !== null && !store.isLoading) {
        return (
            <>
                <Container fluid>
                    <Row className={classes.horizontalPanel}>
                        <Col className={classes.pageName}>
                            <span>Склады</span>
                        </Col>
                        <Col>
                            <div className={classes.userName}>
                            <span className={classes.profile} onClick={profile}>
                                <FontAwesomeIcon
                                    icon={faUser}
                                    size={'1x'}/>
                                {" " + store.currentUser.username}
                            </span>
                                <Button size="sm" variant="outline-primary" className={classes.logoutButton}
                                        onClick={logout}>Выйти</Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <Container fluid className={classes.pageContent}>
                    <Row>
                        <Col md={'3'}>
                            <Stack gap={3} className={classes.leftMenu}>
                                <NavigationCard path={'/'} icon={faWarehouse} text={'Главная'}/>
                                <NavigationCard path={'/storage'} icon={faFileLines} text={'Документы'}/>
                                {(store.currentUser.roleId === 'admin' || store.currentUser.roleId === 'auditor') &&
                                    <NavigationCard path={'/audit'} icon={faBookJournalWhills} text={'Аудит'}/>
                                }
                                {store.currentUser.roleId === 'admin' &&
                                    <NavigationCard path={'/admin'} icon={faScrewdriverWrench} text={'Админ-панель'}/>
                                }
                            </Stack>
                        </Col>
                        <Col className={classes.displayContent}>

                            <Outlet/>

                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
};

export default Layout;