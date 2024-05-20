import React, {useState} from 'react';
import {Button, Modal, ModalProps} from "react-bootstrap";
import {Card, FormItem, FormLayout, Input} from "@vkontakte/vkui";
import styles from '../styles/addcategory.module.css'
import {toast} from "react-toastify";
import CategoryApi from "../api/categoryApi";

interface AddCategoryProps {
    props: ModalProps,
    refresh: () => void
}
const AddCategoryModal : React.FC<AddCategoryProps> = ({props, refresh}) => {

    const [categoryId, setCategoryId] = useState<string>(null);
    const [categoryName, setCategoryName] = useState<string>(null);

    const hideThis = () => {
        setCategoryId(null)
        setCategoryName(null)
        props.onHide()
    }

    const submit = async () => {
        try {

            if (!categoryId || !categoryName) {
                toast.error('Не все поля заполнены!')
                return
            }

            const response = await CategoryApi.AddCategoryAsync(categoryId, categoryName);

            if (!response.data.categoryId) {
                toast.error('Ошибка во время сохранения новой категории!')
                return;
            }

            toast.success('Категория добавлена!');

            refresh()

            hideThis()
        } catch (e : unknown) {
            toast.error('Ошибка во время сохранения новой категории!')
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
                    Добавление категории
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
                                value={categoryName ?? ''}
                                onChange={(e) => setCategoryName(e.target.value)}
                                name={'categoryName'}
                                placeholder={'Моя категория'}/>
                        </FormItem>
                    </FormLayout>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={'success'} onClick={submit}>Добавить</Button>
                <Button variant={'secondary'} onClick={hideThis}>Отмена</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddCategoryModal;