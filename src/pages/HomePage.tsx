import React, {useEffect, useState} from 'react';
import CategoryCard from "../components/CategoryCard";
import UserCard from "../components/UserCard";
import NavigationCard from "../components/NavigationCard";
import DocumentCard from "../components/DocumentCard";
import AuditCard from "../components/AuditCard";
import {faLegal} from "@fortawesome/free-solid-svg-icons/faLegal";
import {Button} from "@vkontakte/vkui";
import AddCategoryModal from "../components/AddCategoryModal";
import AddUserModal from "../components/AddUserModal";
import AddDocumentModal from "../components/AddDocumentModal";
import {Category} from "../api/models/types/Category";
import CategoryApi from "../api/categoryApi";

const HomePage: React.FC = (): JSX.Element => {

    const [show, setShow] = useState(false);
    const [categories, setCategories] = useState<Category[]>();

    const getCategories = async () => {
        try {
            const response = await CategoryApi.GetAllAsync();
            setCategories(response.data)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getCategories()
    }, []);

    return (
        <div>
            <h1>Главная страница</h1>
            <h4>Используйте кнопки слева для перемещения по страницам</h4>
            {/*<CategoryCard category={{categoryName: 'Говно', categoryId: 'govno'}}/>*/}
            {/*<UserCard user={{*/}
            {/*    login: 'zxc',*/}
            {/*    password: 'zxc',*/}
            {/*    roleId: 'zxc',*/}
            {/*    id: 'zxc',*/}
            {/*    dateCreated: new Date(),*/}
            {/*    username: 'Иван Иванович гондон баранович'*/}
            {/*}}/>*/}
            {/*<NavigationCard path={'/zxc/zxc'} icon={faLegal} text={'моча'}/>*/}
            {/*<DocumentCard documentModel={{categoryId: 'test', localPath: 'zxc', name: 'zxc', extension: '.mp4', id: 'zxc'}}/>*/}
            {/*<AuditCard audit={{*/}
            {/*    userId: 'zxc',*/}
            {/*    action: 'Добавление пользователя',*/}
            {/*    additionalDetails: 'Пользователь: zxc | иван говнарь',*/}
            {/*    actionDate: new Date(),*/}
            {/*    user: {*/}
            {/*        username: 'Иван Иванович гондон баранович',*/}
            {/*        id: 'zxc',*/}
            {/*        login: 'GovnoMochaZalupasadadasd',*/}
            {/*        password: null,*/}
            {/*        dateCreated: new Date(),*/}
            {/*        roleId: 'admin'*/}
            {/*    }*/}
            {/*}}/>*/}
            {/*/!*<Button onClick={() => setShow(true)}></Button>*!/*/}
            {/*/!*<AddCategoryModal props={{show: show, onHide: () => setShow(false)}}/>*!/*/}
            {/*<Button onClick={() => setShow(true)}></Button>*/}
            {/*<AddDocumentModal props={{show: show, onHide: () => setShow(false)}} refresh={() => console.log('zxc')} categories={categories}/>*/}
        </div>
    );
};

export default HomePage;