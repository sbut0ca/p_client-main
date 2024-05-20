import React, {useState} from 'react';
import {Category} from "../api/models/types/Category";
import {Card} from "@vkontakte/vkui";
import styles from '../styles/itemcard.module.css'
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFolder} from "@fortawesome/free-solid-svg-icons/faFolder";
import EditCategoryModal from "./EditCategoryModal";
import DeleteCategoryModal from "./DeleteCategoryModal";

interface CategoryCardProps {
    category: Category
    refresh?: () => void
}

const CategoryCard: React.FC<CategoryCardProps> = ({category, refresh}) => {

    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    return (
        <Card mode={'outline'} style={{background: '#f3f3f3'}}>
            <div className={styles.container}>
                <div className={styles.icon}>
                    <FontAwesomeIcon icon={faFolder} size={'3x'}/>
                </div>
                <div className={styles.info}>
                    <span><strong>Код категории:</strong> {category.categoryId}</span>
                    <span><strong>Название категории:</strong> {category.categoryName}</span>
                </div>
                <div className={styles.buttons}>
                    <Button variant={'danger'} onClick={() => setShowDeleteModal(true)}>Удалить</Button>
                    <Button variant={'primary'} onClick={() => setShowEditModal(true)}>Изменить</Button>
                </div>
            </div>
            <EditCategoryModal category={category} props={{show: showEditModal, onHide: () => setShowEditModal(false)}} refresh={refresh}/>
            <DeleteCategoryModal category={category} props={{show: showDeleteModal, onHide: () => setShowDeleteModal(false)}} refresh={refresh}/>
        </Card>
    );
};

export default CategoryCard;