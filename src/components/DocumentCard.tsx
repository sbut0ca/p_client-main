import React, {useState} from 'react';
import {DocumentModel} from "../api/models/types/DocumentModel";
import styles from "../styles/itemcard.module.css";
import {Button} from "react-bootstrap";
import {Card} from "@vkontakte/vkui";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFile} from "@fortawesome/free-solid-svg-icons/faFile";
import DocumentApi from "../api/documentApi";
import {toast} from "react-toastify";
import DeleteDocumentModal from "./DeleteDocumentModal";
import EditDocumentModal from "./EditDocumentModal";
import {Category} from "../api/models/types/Category";

interface DocumentCardProps {
    documentModel: DocumentModel,
    roleId?: string
    refresh?: () => void,
    categories?: Category[]
}

const DocumentCard: React.FC<DocumentCardProps> = ({documentModel, roleId = 'user', refresh, categories}) => {

    const [showDeleteDocumentModal, setShowDeleteDocumentModal] = useState(false);
    const [showEditDocumentModal, setShowEditDocumentModal] = useState(false);

    const download = async () => {
        try {
            const downloadDocumentAsync = DocumentApi.DownloadDocumentAsync(documentModel.id);

            const id = toast.loading('Начало загрузки...')

            downloadDocumentAsync.then((response) => {

                if (!response) {
                    toast.update(id, {render: 'Файл не найден', type: 'error', isLoading: false, autoClose: 2000})
                    return
                }

                const href = URL.createObjectURL(response.data)

                const a = Object.assign(
                    document.createElement('a'),
                    {href,
                        style:'display:none',
                        download: documentModel.name + documentModel.extension}
                )

                document.body.appendChild(a)
                a.click()
                URL.revokeObjectURL(href)
                a.remove()
            })
            toast.update(id, {render: 'Скачивание завершено', type: 'success', isLoading: false, autoClose: 2000})

        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Card mode={'outline'} style={{background: '#f3f3f3'}}>

            <div className={styles.container}>
                <div className={styles.icon}>
                    <FontAwesomeIcon icon={faFile} size={'3x'}/>
                </div>
                <div className={styles.info}>
                    <span><strong>Название документа:</strong> {documentModel.name}</span>
                    <span><strong>Расширение документа:</strong> {documentModel.extension}</span>
                </div>
                <div className={styles.buttons}>
                    {roleId === 'admin' &&
                        <>
                            <Button variant={'danger'} onClick={() => setShowDeleteDocumentModal(true)}>Удалить</Button>
                            <Button variant={'primary'} onClick={() => setShowEditDocumentModal(true)}>Изменить</Button>
                        </>
                    }
                    <Button variant={'success'} onClick={download}>Скачать</Button>
                </div>
            </div>
            <DeleteDocumentModal documentModel={documentModel} props={{show: showDeleteDocumentModal, onHide: () => setShowDeleteDocumentModal(false)}} refresh={refresh}/>
            <EditDocumentModal document={documentModel} props={{show: showEditDocumentModal, onHide: () => setShowEditDocumentModal(false)}} categories={categories} refresh={refresh}/>
        </Card>
    );
};

export default DocumentCard;