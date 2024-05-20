import React from 'react';
import {Container} from "react-bootstrap";
import NavigationCard from "../components/NavigationCard";
import {faUser} from "@fortawesome/free-solid-svg-icons/faUser";
import {faFolder} from "@fortawesome/free-solid-svg-icons/faFolder";
import styles from '../styles/navigationpage.module.css'

const AdminPage = () => {
    return (
        <Container>
            <div className={styles.container}>
                <NavigationCard path={'/admin/users'} icon={faUser} text={'Пользователи'}/>
                <NavigationCard path={'/admin/categories'} icon={faFolder} text={'Категории'}/>
            </div>
        </Container>
    );
};

export default AdminPage;