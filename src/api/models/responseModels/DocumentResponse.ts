import {DocumentModel} from "../types/DocumentModel";

export interface DeleteDocumentResponse {
    isSuccess: boolean,
    document: DocumentModel
}

export interface UpdateDocumentResponse {
    isChanged: boolean,
    document: DocumentModel
}