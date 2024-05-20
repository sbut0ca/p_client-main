import {Category} from "../types/Category";

export interface DeleteCategoryResponse {
    isSuccess: boolean,
    category: Category
}

export interface UpdateCategoryResponse {
    isChanged: boolean,
    category: Category
}