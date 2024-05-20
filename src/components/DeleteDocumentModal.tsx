import React, {ChangeEvent, useEffect, useState} from 'react';
import {Button, Modal, ModalProps} from "react-bootstrap";
import {FormItem, FormLayout, Input, Select} from "@vkontakte/vkui";
import {Form} from 'react-bootstrap';
import {toast} from "react-toastify";
import {Category} from "../api/models/types/Category";
import DocumentApi from "../api/documentApi";
import {DocumentModel} from "../api/models/types/DocumentModel";

interface DeleteDocumentProps {
    documentModel: DocumentModel
    props: ModalProps,
    refresh: () => void,
}
const DeleteDocumentModal : React.FC<DeleteDocumentProps> = ({documentModel, props, refresh}) => {

    const [name, setName] = useState(documentModel.name);

    const hideThis = () => {
        setName(documentModel.name)
        props.onHide()
    }

    const submit = async () => {
        try {

            if (!name) {
                toast.error('Не все поля заполнены!')
                return
            }

            const response = await DocumentApi.DeleteDocumentAsync(documentModel.id)

            if (!response.data.isSuccess) {
                toast.error('Ошибка во время удаления документа')
                return
            }

            toast.success('Документ удален!');

            refresh()

            hideThis()
        } catch (e : unknown) {
            toast.error('Ошибка во время удаления документа!')
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
                    Удаление документа
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
                            disabled
                            value={name ?? ''}
                            onChange={(e) => setName(e.target.value)}
                            name={'documentName'}
                            placeholder={'Мой документ'}/>
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

export default DeleteDocumentModal;