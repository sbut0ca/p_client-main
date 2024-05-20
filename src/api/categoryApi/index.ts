import {AxiosResponse} from "axios";
import {Category} from "../models/types/Category";
import api from "../base";
import {DeleteCategoryResponse, UpdateCategoryResponse} from "../models/responseModels/CategoryResponse";

export const CATEGORY_ENDPOINT = import.meta.env.VITE_CATEGORY_ENDPOINT;

export default class CategoryApi {
    static async GetAllAsync(): Promise<AxiosResponse<Category[]>> {
        return api.get<Category[]>(CATEGORY_ENDPOINT + '/getAll');
    }

    static async GetByIdAsync(categoryId: string): Promise<AxiosResponse<Category>> {
        return api.get<Category>(CATEGORY_ENDPOINT + '/getById/' + categoryId);
    }

    static async AddCategoryAsync(categoryId: string, categoryName: string): Promise<AxiosResponse<Category>> {
        return api.post<Category>(CATEGORY_ENDPOINT + '/addCategory', {
            categoryId: categoryId,
            categoryName: categoryName
        });
    }

    static async DeleteCategoryAsync(categoryId: string): Promise<AxiosResponse<DeleteCategoryResponse>> {
        return api.delete<DeleteCategoryResponse>(CATEGORY_ENDPOINT + '/deleteCategory/' + categoryId);
    }

    static async UpdateCategoryAsync(categoryId?: string, categoryName?: string): Promise<AxiosResponse<UpdateCategoryResponse>> {
        return api.put<UpdateCategoryResponse>(CATEGORY_ENDPOINT + '/updateCategory', {
            categoryId: categoryId ?? "",
            categoryName: categoryName ?? ""
        });
    }
}