import {AuditLog} from "../models/types/AuditLog";
import api from "../base";
import {AxiosResponse} from 'axios';

export const AUDIT_ENDPOINT = import.meta.env.VITE_AUDIT_ENDPOINT

export default class AuditApi {
    static async GetAuditLogsAsync(): Promise<AxiosResponse<AuditLog[]>> {
        return api.get<AuditLog[]>(AUDIT_ENDPOINT + '/getAll');
    }

    static async GetAuditLogsByUserIdAsync(userId: string): Promise<AxiosResponse<AuditLog[]>> {
        return api.get<AuditLog[]>(AUDIT_ENDPOINT + '/getAllByUserId/' + userId);
    }
}