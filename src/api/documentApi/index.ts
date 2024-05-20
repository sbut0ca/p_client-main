import {AxiosResponse} from "axios";
import {DocumentModel} from "../models/types/DocumentModel";
import api from "../base";
import {DeleteDocumentResponse, UpdateDocumentResponse} from "../models/responseModels/DocumentResponse";


export const DOCUMENT_ENDPOINT = import.meta.env.VITE_DOCUMENT_ENDPOINT

export default class DocumentApi {
    static async GetAllAsync(): Promise<AxiosResponse<DocumentModel[]>> {
        return api.get<DocumentModel[]>(DOCUMENT_ENDPOINT + '/getAll');
    }

    static async GetByIdAsync(documentId: string): Promise<AxiosResponse<DocumentModel>> {
        return api.get<DocumentModel>(DOCUMENT_ENDPOINT + '/getById/' + documentId);
    }

    static async GetByCategoryAsync(categoryId: string): Promise<AxiosResponse<DocumentModel[]>> {
        return api.get<DocumentModel[]>(DOCUMENT_ENDPOINT + '/getByCategory/' + categoryId);
    }

    static async DeleteDocumentAsync(documentId: string): Promise<AxiosResponse<DeleteDocumentResponse>> {
        return api.delete<DeleteDocumentResponse>(DOCUMENT_ENDPOINT + '/delete/' + documentId);
    }

    static async UpdateDocumentAsync(documentId: string, documentName: string, documentCategory: string): Promise<AxiosResponse<UpdateDocumentResponse>> {
        return api.put<UpdateDocumentResponse>(DOCUMENT_ENDPOINT + '/update', {
            id: documentId,
            newName: documentName,
            newCategoryId: documentCategory
        });
    }

    static async UploadDocumentAsync(documentName: string, documentCategory: string, file: FormData) : Promise<AxiosResponse<DocumentModel>> {
        return api.post(DOCUMENT_ENDPOINT + `/upload?name=${encodeURIComponent(documentName)}&categoryId=${documentCategory}`, file)
    }

    static async DownloadDocumentAsync(documentId: string) {
        return await api.get(DOCUMENT_ENDPOINT + '/download?id=' + documentId, {
            responseType: 'blob'
        })

        // console.log(response.data)
        //
        // return new Blob([response.data], {type: 'octet-stream'})
    }

    //todo Download
    //todo Upload


}