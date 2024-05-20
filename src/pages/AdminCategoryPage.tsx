import React, {useEffect, useState} from 'react';
import {Search} from "@vkontakte/vkui";
import {Button, Container, Stack} from "react-bootstrap";
import {Category} from "../api/models/types/Category";
import {toast} from "react-toastify";
import CategoryApi from "../api/categoryApi";
import CategoryCard from "../components/CategoryCard";
import AddCategoryModal from "../components/AddCategoryModal";

const AdminCategoryPage = () => {
    const [search, setSearch] = useState('');
    const [categories, setCategories] = useState<Category[]>();
    const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);


    const getCategoriesAsync = async () => {
        try {
            const response = await CategoryApi.GetAllAsync();

            setCategories(response.data.filter((c) => c.categoryId !== 'none'))
        } catch (e: unknown) {
            console.log(e)
            toast.error("Ошибка при загрузке");
        }
    }

    const filter = (category: Category) => {
        const searchLower = search.toLowerCase();

        return category.categoryName.toLowerCase().includes(searchLower) ||
            category.categoryId.toLowerCase().includes(searchLower)
    }

    useEffect(() => {
        getCategoriesAsync()
    }, []);


    return (
        <Container>
            <div style={{display: "flex", alignItems: 'center'}}>
                <Search value={search} onChange={(e) => setSearch(e.target.value)}/>
                <Button variant={'success'} onClick={() => setShowAddCategoryModal(true)}>Добавить</Button>
            </div>
            <hr/>
            <Stack gap={3} className={'me-md-auto'} style={{marginTop: '10px'}}>
                {categories &&
                    categories
                        .filter((category) => filter(category))
                        .map((category) => <CategoryCard key={category.categoryId} category={category} refresh={getCategoriesAsync}/>)
                }
            </Stack>
            <AddCategoryModal props={{show: showAddCategoryModal, onHide: () => setShowAddCategoryModal(false)}} refresh={getCategoriesAsync}/>
        </Container>
    );
};

export default AdminCategoryPage;