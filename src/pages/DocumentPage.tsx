import React, {useContext, useEffect, useState} from 'react';
import {toast} from "react-toastify";
import {Button, Container, Stack} from "react-bootstrap";
import {Search} from "@vkontakte/vkui";
import {DocumentModel} from "../api/models/types/DocumentModel";
import DocumentApi from "../api/documentApi";
import {useParams} from "react-router-dom";
import DocumentCard from "../components/DocumentCard";
import {Context} from "../main";
import AddDocumentModal from "../components/AddDocumentModal";
import CategoryApi from "../api/categoryApi";
import {Category} from "../api/models/types/Category";

const DocumentPage = () => {

    const {id} = useParams();

    const {store} = useContext(Context)

    const [search, setSearch] = useState('');
    const [documents, setDocuments] = useState<DocumentModel[]>();
    const [addDocumentModal, setAddDocumentModal] = useState(false);
    const [categories, setCategories] = useState<Category[]>();

    const getCategories = async () => {
        try {
            const response = await CategoryApi.GetAllAsync();

            setCategories(response.data);
        } catch (e) {
            console.log(e)
        }
    }

    const getDocumentsAsync = async () => {
        try {

            if (id === 'all') {
                const response = await DocumentApi.GetAllAsync();

                setDocuments(response.data)
                return;
            }

            const response = await DocumentApi.GetByCategoryAsync(id);
            setDocuments(response.data)

        } catch (e: unknown) {
            console.log(e)
            toast.error('Ошибка во время выполнения запроса');
        }
    }

    const filter = (documentModel: DocumentModel) => {
        const searchLower = search.toLowerCase();

        return documentModel.name.toLowerCase().includes(searchLower) ||
            documentModel.extension.toLowerCase().includes(searchLower)
    }

    useEffect(() => {
        getDocumentsAsync()
        getCategories()
    }, []);

    return (
        <Container>
            <div style={{display: "flex", alignItems: 'center'}}>
                <Search value={search} onChange={(e) => setSearch(e.target.value)}/>
                {store.currentUser.roleId === 'admin' && <Button variant={'success'} onClick={() => setAddDocumentModal(true)}>Добавить</Button>}
            </div>
            <hr/>
            <Stack gap={3} className={'me-md-auto'} style={{marginTop: '10px'}}>
                {documents &&
                    documents
                        .filter((document) => filter(document))
                        .map((document) => <DocumentCard documentModel={document} roleId={store.currentUser.roleId}
                                                         key={document.id} refresh={getDocumentsAsync} categories={categories}/>)
                }
            </Stack>
            <AddDocumentModal
                props={
                    {
                        show: addDocumentModal,
                        onHide: () => setAddDocumentModal(false)
                    }
                }
                refresh={getDocumentsAsync}
                categories={categories}
            />
        </Container>
    )
};

export default DocumentPage;