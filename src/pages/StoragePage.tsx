import React, {useEffect, useState} from 'react';
import {Category} from "../api/models/types/Category";
import CategoryApi from "../api/categoryApi";
import {toast} from "react-toastify";
import styles from '../styles/navigationpage.module.css';
import NavigationCard from "../components/NavigationCard";
import {faFolder} from "@fortawesome/free-solid-svg-icons/faFolder";

const StoragePage = () => {

    const [categories, setCategories] = useState<Category[]>();

    const getCategoriesAsync = async () => {
        try {
            const response = await CategoryApi.GetAllAsync();

            setCategories(response.data.filter((c) => c.categoryId !== 'none'))
        } catch (e: unknown) {
            console.log(e)
            toast.error("Ошибка при загрузке");
        }
    }

    useEffect(() => {
        getCategoriesAsync()
    }, []);


    return (
        <div className={styles.container}>
            <NavigationCard
                path={`/storage/all`}
                icon={faFolder}
                text={'Все документы'}
                key={'allzxc'}/>

            {categories &&
                categories.map((category) =>
                    <NavigationCard
                        path={`/storage/${category.categoryId}`}
                        icon={faFolder}
                        text={category.categoryName}
                        key={category.categoryId}/>)}
        </div>
    );
};

export default StoragePage;