import {Route} from "./types/route";
import RequireAuth from "./hoc/RequireAuth";
import AuditPage from "./pages/AuditPage";
import UsersPage from "./pages/UsersPage";
import AdminPage from "./pages/AdminPage";
import AdminCategoryPage from "./pages/AdminCategoryPage";
import StoragePage from "./pages/StoragePage";
import DocumentPage from "./pages/DocumentPage";

export const UserRoutes: Route[] = [
    {
        path: '/storage',
        element:
            <RequireAuth>
                <StoragePage/>
            </RequireAuth>
    },
    {
        path: '/storage/:id',
        element:
            <RequireAuth>
                <DocumentPage/>
            </RequireAuth>
    },
]

export const AuditRoutes: Route[] = [
    {
        path: '/storage',
        element:
            <RequireAuth>
                <StoragePage/>
            </RequireAuth>
    },
    {
        path: '/storage/:id',
        element:
            <RequireAuth>
                <DocumentPage/>
            </RequireAuth>
    },
    {
        path: '/audit',
        element:
            <RequireAuth>
                <AuditPage/>
            </RequireAuth>
    }

]

export const AdminRoutes: Route[] = [
    {
        path: '/storage',
        element:
            <RequireAuth>
                <StoragePage/>
            </RequireAuth>
    },
    {
        path: '/storage/:id',
        element:
            <RequireAuth>
                <DocumentPage/>
            </RequireAuth>
    },
    {
        path: '/audit',
        element:
            <RequireAuth>
                <AuditPage/>
            </RequireAuth>
    },
    {
        path: '/admin',
        element:
            <RequireAuth>
                <AdminPage/>
            </RequireAuth>
    },
    {
        path: '/admin/users',
        element:
            <RequireAuth>
                <UsersPage/>
            </RequireAuth>
    },
    {
        path: '/admin/categories',
        element:
            <RequireAuth>
                <AdminCategoryPage/>
            </RequireAuth>
    },
]