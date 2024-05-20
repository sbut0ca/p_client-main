import React, {useState} from 'react';
import {Button, Modal, ModalProps} from "react-bootstrap";
import {Card, FormItem, FormLayout, Input} from "@vkontakte/vkui";
import styles from '../styles/addcategory.module.css'
import {toast} from "react-toastify";
import CategoryApi from "../api/categoryApi";
import {Category} from "../api/models/types/Category";

interface DeleteCategoryProps {
    category: Category
    props: ModalProps,
    refresh: () => void
}
const DeleteCategoryProps : React.FC<DeleteCategoryProps> = ({category, props, refresh}) => {

    const [categoryId, setCategoryId] = useState<string>(category.categoryId);
    const [categoryName, setCategoryName] = useState<string>(category.categoryName);

    const hideThis = () => {
        setCategoryId(category.categoryId)
        setCategoryName(category.categoryName)
        props.onHide()
    }

    const submit = async () => {
        try {

            if (!categoryId || !categoryName) {
                toast.error('Не все поля заполнены!')
                return
            }

            const response = await CategoryApi.DeleteCategoryAsync(categoryId)

            if (!response.data.isSuccess) {
                toast.error('Ошибка во время удаления категории!')
                return;
            }

            toast.success('Категория удалена!');

            refresh()

            hideThis()
        } catch (e : unknown) {
            toast.error('Ошибка во время удаления категории!')
        }
    }

    return (
        <Modal
            {...props}
            onHide={hideThis}
            size="lg"
            aria-labelledby="addcategorymodal"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Удаление категории
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormLayout>
                    <FormItem
                        top={'Код категории'}
                        status={categoryId === null ? 'default' : categoryId.length > 0 ? 'default' : 'error'}
                        bottom={categoryId === null ? '' : categoryId.length > 0 ? '' : 'Код категории не может быть пустым!'}
                    >
                        <Input
                            disabled
                            value={categoryId ?? ''}
                            onChange={(e) => setCategoryId(e.target.value)}
                            name={'categoryId'}
                            placeholder={'myCategoryCode'}/>
                    </FormItem>
                    <FormItem
                        top={'Название категории'}
                        status={categoryName === null ? 'default' : categoryName.length > 0 ? 'default' : 'error'}
                        bottom={categoryName === null ? '' : categoryName.length > 0 ? '' : 'Название категории не может быть пустым!'}
                    >
                        <Input
                            disabled
                            value={categoryName ?? ''}
                            onChange={(e) => setCategoryName(e.target.value)}
                            name={'categoryName'}
                            placeholder={'Моя категория'}/>
                    </FormItem>
                </FormLayout>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={'danger'} onClick={submit}>Удалить</Button>
                <Button variant={'secondary'} onClick={hideThis}>Отмена</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteCategoryProps;