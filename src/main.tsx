import React, {createContext} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Store from "./store";

import '@vkontakte/vkui/dist/vkui.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-toastify/dist/ReactToastify.css";
import './styles/index.css'

export interface State {
    store: Store
}

const store = new Store();

export const Context = createContext<State>({
    store
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Context.Provider value={{store}}>
            <App/>
        </Context.Provider>
    </React.StrictMode>,
)
