import React, {useState} from 'react';
import {Card} from "@vkontakte/vkui";
import styles from '../styles/itemcard.module.css'
import {User} from "../api/models/types/User";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons/faUser";
import EditUserModal from "./EditUserModal";
import DeleteUserModal from "./DeleteUserModal";

interface UserCardProps {
    user: User,
    refresh?: () => void
}

const UserCard: React.FC<UserCardProps> = ({user, refresh}) => {

    const [showEditUserModal, setShowEditUserModal] = useState(false);
    const [showDeleteuserModal, setShowDeleteuserModal] = useState(false);

    return (
        <Card mode={'outline'} style={{background: '#f3f3f3'}}>
            <div className={styles.container}>
                <div className={styles.icon}>
                    <FontAwesomeIcon icon={faUser} size={'3x'}/>
                </div>
                <div className={styles.info}>
                    <span><strong>Имя пользователя:</strong> {user.username}</span>
                    <span><strong>Логин пользователя:</strong> {user.login}</span>
                    <span><strong>Роль пользователя:</strong> {user.roleId}</span>
                </div>
                <div className={styles.buttons}>
                    <Button variant={'danger'} onClick={() => setShowDeleteuserModal(true)}>Удалить</Button>
                    <Button variant={'primary'} onClick={() => setShowEditUserModal(true)}>Изменить</Button>
                </div>
                <EditUserModal user={user} props={{show: showEditUserModal, onHide: () => setShowEditUserModal(false)}} refresh={refresh}/>
                <DeleteUserModal user={user} props={{show: showDeleteuserModal, onHide: () => setShowDeleteuserModal(false)}} refresh={refresh}/>
            </div>
        </Card>
    );
};

export default UserCard;