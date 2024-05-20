import React, {ChangeEvent, useEffect, useState} from 'react';
import {Button, Modal, ModalProps} from "react-bootstrap";
import {FormItem, FormLayout, Input, Select} from "@vkontakte/vkui";
import {Form} from 'react-bootstrap';
import {toast} from "react-toastify";
import {Category} from "../api/models/types/Category";
import DocumentApi from "../api/documentApi";
import {DocumentModel} from "../api/models/types/DocumentModel";

interface EditDocumentProps {
    document: DocumentModel
    props: ModalProps,
    refresh: () => void,
    categories: Category[]
}
const EditDocumentModal : React.FC<EditDocumentProps> = ({document, props, refresh, categories}) => {

    const [name, setName] = useState(document.name);
    const [categoryId, setCategoryId] = useState<string>(document && document.category.categoryId);

    const hideThis = () => {
        setCategoryId(document.category.categoryId)
        setName(document.name)
        props.onHide()
    }

    const submit = async () => {
        try {

            if (!categoryId || !name) {
                toast.error('Не все поля заполнены!')
                return
            }

            const response = await DocumentApi.UpdateDocumentAsync(document.id, name, categoryId);

            if(!response.data.isChanged) {
                toast.error('Ошибка во время изменения документа')
                return
            }

            toast.success('Документ изменен!');

            refresh()

            hideThis()
        } catch (e : unknown) {
            toast.error('Ошибка во время изменения документа!')
        }
    }

    return (
        <Modal
            {...props}
            onHide={hideThis}
            size="lg"
            aria-labelledby="updatedocument"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Изменение документа
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormLayout>
                    <FormItem
                        top={'Название документа'}
                        status={name === null ? 'default' : name.length > 0 ? 'default' : 'error'}
                        bottom={name === null ? '' : name.length > 0 ? '' : 'Название документа не может быть пустым!'}
                    >
                        <Input
                            value={name ?? ''}
                            onChange={(e) => setName(e.target.value)}
                            name={'documentName'}
                            placeholder={'Мой документ'}/>
                    </FormItem>
                    <FormItem
                        top={'Категория документа'}
                        status={categoryId === null ? 'default' : categoryId.length > 0 ? 'default' : 'error'}
                        bottom={categoryId === null ? '' : categoryId.length > 0 ? '' : 'Код категории не может быть пустым!'}
                    >
                        <Select
                            options={categories &&
                                categories.map((category) =>
                                    (
                                        {value: category.categoryId, label: category.categoryName}
                                    ))
                            }
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                        />
                    </FormItem>
                </FormLayout>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={'success'} onClick={submit}>Изменить</Button>
                <Button variant={'secondary'} onClick={hideThis}>Отмена</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditDocumentModal;