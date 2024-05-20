import {User} from "./User";

export interface AuditLog {
    id: number
    userId: string
    action: string
    actionDate: Date
    additionalDetails?: string,
    user?: User
}