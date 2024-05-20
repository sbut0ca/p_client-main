import React from 'react';
import {AuditLog} from "../api/models/types/AuditLog";
import styles from "../styles/itemcard.module.css";
import {Button} from "react-bootstrap";
import {Card} from "@vkontakte/vkui";
import {faClockRotateLeft} from "@fortawesome/free-solid-svg-icons/faClockRotateLeft";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface AuditCardProps {
    audit: AuditLog
}

const AuditCard: React.FC<AuditCardProps> = ({audit}) => {
    return (
        <Card mode={'outline'} style={{background: '#f3f3f3'}}>
            <div className={styles.container}>
                <div className={styles.icon}>
                    <FontAwesomeIcon icon={faClockRotateLeft} size={'3x'}/>
                </div>
                <div className={styles.info}>
                    <span><strong>Имя пользователя:</strong> {audit.user.username}</span>
                    <span><strong>Логин пользователя:</strong> {audit.user.login}</span>
                    <span><strong>Действие:</strong> {audit.action}</span>
                    {audit.additionalDetails && <span><strong>Дополнительно:</strong> {audit.additionalDetails}</span>}
                    <span><strong>Дата:</strong> {audit.actionDate.toLocaleString('ru-RU')}</span>
                </div>
                <div className={styles.buttons}>
                    <Button variant={'primary'} disabled>Неизменяемые данные</Button>
                </div>
            </div>
        </Card>
    );
};

export default AuditCard;