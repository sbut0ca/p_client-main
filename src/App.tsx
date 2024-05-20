import React, {useContext, useEffect} from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Context} from "./main";
import {observer} from "mobx-react-lite";
import {AdminRoutes, AuditRoutes, UserRoutes} from "./routes";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import RequireAuth from "./hoc/RequireAuth";
import {ToastContainer} from "react-toastify";
import Layout from "./components/Layout";
import Loader from "./components/Loader";
import LoadingOrErrorPage from "./pages/LoadingOrErrorPage";

const App: React.FC = observer(() => {

    const {store} = useContext(Context);

    useEffect(() => {
        store.CheckAuth().then(() => console.log('complete'))
    }, []);

    const MapEndpoints = () => {
        switch (store.currentUser.roleId) {
            case 'user':
                return UserRoutes.map((r) => {
                    console.log('user routes mapping')
                    return <Route path={r.path} element={r.element} key={r.path}/>
                })
            case 'auditor':
                return AuditRoutes.map((r) => {
                    console.log('audit routed mapping')
                    return <Route path={r.path} element={r.element} key={r.path}/>
                })
            case 'admin':
                return AdminRoutes.map((r) => {
                    console.log('admin routes mapping')
                    return <Route path={r.path} element={r.element} key={r.path}/>
                })
        }
    }

    return (
        <BrowserRouter>
            <Routes>
                {/*Authorization path*/}
                <Route path={'/auth'} element={<AuthPage/>}/>

                {/*Home path*/}
                {store.currentUser && !store.isLoading && <Route path={'/'} element={<Layout/>}>
                    <Route index element={
                        <RequireAuth>
                            <HomePage/>
                        </RequireAuth>}/>
                    {MapEndpoints()}
                    <Route path='*' element={<LoadingOrErrorPage/>}/>
                </Route>}

                {/*Not Found path*/}
                <Route path='*' element={<LoadingOrErrorPage/>}/>
            </Routes>

            <ToastContainer position={"bottom-left"} autoClose={2000} limit={5}/>

        </BrowserRouter>
    )
})

export default App
