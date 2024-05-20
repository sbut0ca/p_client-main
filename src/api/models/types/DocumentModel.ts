import {Category} from "./Category";

export interface DocumentModel {
    id: string
    name: string
    extension: string
    categoryId: string
    localPath: string
    category: Category
}