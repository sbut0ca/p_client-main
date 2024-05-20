import React, {ChangeEvent, useEffect, useState} from 'react';
import {Button, Modal, ModalProps} from "react-bootstrap";
import {FormItem, FormLayout, Input, Select} from "@vkontakte/vkui";
import {Form} from 'react-bootstrap';
import {toast} from "react-toastify";
import {Category} from "../api/models/types/Category";
import DocumentApi from "../api/documentApi";

interface AddDocumentProps {
    props: ModalProps,
    refresh: () => void,
    categories: Category[]
}
const AddDocumentModal : React.FC<AddDocumentProps> = ({props, refresh, categories}) => {

    const [name, setName] = useState(null);
    const [categoryId, setCategoryId] = useState('none');
    const [document, setDocument] = useState<File>(null);

    const hideThis = () => {
        setCategoryId('none')
        setName(null)
        setDocument(null)
        props.onHide()
    }

    const handleFile = (e : ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setDocument(e.target.files[0])
        }
    }

    const submit = async () => {
        try {

            if (!categoryId || !name || !document) {
                toast.error('Не все поля заполнены!')
                return
            }

            const formData = new FormData()

            formData.set('file', document)

            const response = await DocumentApi.UploadDocumentAsync(name, categoryId, formData);

            if(!response.data.id) {
                toast.error('Ошибка во время загрузки документа')
                return
            }

            toast.success('Документ добавлен!');

            refresh()

            hideThis()
        } catch (e : unknown) {
            toast.error('Ошибка во время добавления документа!')
        }
    }

    return (
        <Modal
            {...props}
            onHide={hideThis}
            size="lg"
            aria-labelledby="adddocumentmodal"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавление документа
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
                    <FormItem
                        top={'Файл документа'}
                    >
                        <Form.Control type="file" onChange={handleFile}/>
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

export default AddDocumentModal;